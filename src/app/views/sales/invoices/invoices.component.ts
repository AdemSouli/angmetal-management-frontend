import { Component, OnInit } from '@angular/core';
import { SellesInvoiceService } from '../../../shared/sales/facture-vente.service';
import { ProductService } from '../../../shared/products/product.service';
import { ClientService } from '../../../shared/sales/client.service';
import { Client } from '../../models/Client';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Banque } from '../../models/Banque';
import { BanqueService } from 'src/app/shared/banks/banque.service';
import { Product } from '../../models/Product';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {
  displayCreateInvoice: boolean = false;
  
  Invoice: any = {};
  paymentType = ['CREDIT'];
  banques:Banque[] = [];;
  clients: Client[] = [];
  products: Product[] = [];
  selectedClient : {client: Client["clientID"]| undefined}[] = [];
  selectedBanque : {banque: Banque["compteID"]| undefined}[] = [];
  selectedProducts: { product: Product["productID"] | undefined, quantity: number }[] = [];
  minDate: Date = new Date(); 
  maxDate: Date = new Date(2025, 11, 31);

  invoice = {   
    montantTotal: 0,
    compteID: 0 , 
    clientID:0,
    dateEmission: new Date(), 
    dateEcheance: new Date(),  
    paymentType: "CREDIT",
    selectedBanque: {}as Banque,
    selectedClient: {} as Client, 
    selectedProducts: []  
  };

  constructor(
    private factureVenteService: SellesInvoiceService,
    private clientService: ClientService,
    private productService: ProductService,
    private banqueService : BanqueService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getFactureVentes();
    this.getClients();
    this.getProducts();
    this.getBanques();
  }
  getBanques(){
    this.banqueService.getBanques().subscribe(data =>{

      console.log("banks from backend ", data)
      this.banques= data;
    })
  }
  // Fetch all invoice data
  getFactureVentes(): void {
    this.factureVenteService.getAllFactureVentes().subscribe(
      (data: any[]) => this.factureVentes = data,
      (error) => console.error('Error fetching FactureVente data', error)
    );
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (data: Client[]) => this.clients = data,
      (error) => console.error('Error fetching client data', error)
    );
  }
  getProductById(productId: number): Product | undefined {
    return this.products.find(p => p.productID === productId);
  }
getProducts(): void {
  this.productService.getAllProducts().subscribe(
    (data: Product[]) => {
      console.log('Products loaded:', data);
      this.products = data;
    },
    (error) => console.error('Error fetching product data', error)
  );
}

addNewProduct(): void {
  this.selectedProducts.push({ product: undefined, quantity: 1 });
}
onProductSelect(index: number): void {
  console.log('onProductSelect triggered');
  const selectedProduct = this.selectedProducts[index];
  if (selectedProduct && selectedProduct.product) {
    const product = this.products.find(p => p.productID === selectedProduct.product);
    if (product) {
      // If the selected quantity exceeds the stock, set it to the max available stock
      if (selectedProduct.quantity > product.quantiteEnStock) {
        this.selectedProducts[index].quantity = product.quantiteEnStock;
        this.messageService.add({ 
          severity: 'warn', 
          summary: 'Quantity Limit', 
          detail: `Maximum available quantity is ${product.quantiteEnStock}` 
        });
      }
      console.log(`Selected product: ${product.name} (ID: ${product.productID})`);
    }
  } else {
    console.log('No product selected or product is undefined.');
  }
}




getMaxQuantity(productID: number | undefined): number {
  if (productID === undefined) {
    return 0;  // If productID is undefined, no max quantity is available
  }
  const product = this.products.find(p => p.productID === productID);
  return product ? product.quantiteEnStock : 0;
}


onClientSelect(index: number): void {
  const selectedClient = this.clients[index]; 
  if (selectedClient) {
    this.invoice.clientID = selectedClient.clientID;  
    console.log(`Selected client: ${selectedClient.name} (ID: ${selectedClient.clientID})`);
  } else {
    console.log('No client selected or client is undefined.');
  }
}
onBanqueSelect(index: number): void {
  const selectedBanque = this.banques[index]; 
  if (selectedBanque) {
  this.invoice.compteID = selectedBanque.compteID;  
  console.log(`Selected banque: ${selectedBanque.name} (Compte ID: ${selectedBanque.compteID})`);
}else {
  console.log('No banque selected or banque is undefined.');
}
}


  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
  }

  showCreateInvoiceDialog(): void {
    this.displayCreateInvoice = true;
  }

// Method to check if the selected quantities are valid
isQuantityValid(): boolean {
  return this.selectedProducts.every(productData => {
    if (productData.product !== undefined) {
      const product = this.products.find(p => p.productID === productData.product);
      return product && productData.quantity <= product.quantiteEnStock;
    }
    return true;  // If no product selected, it's valid
  });
}

// Method to check if Save button should be disabled
isSaveButtonDisabled(): boolean {
  // Check if any product has invalid quantity or if Banque or Client is not selected
  return !this.isQuantityValid() || !this.invoice.compteID || !this.invoice.clientID;
}

// Rest of your existing code remains unchanged

createInvoice(): void {
  let totalAmount = 0;

  const productsToSend = this.selectedProducts
    .map(productData => {
      if (productData.product !== undefined) {
        const product = this.products.find(p => p.productID === productData.product);
        if (product) {
          const quantity = Math.min(productData.quantity, product.quantiteEnStock);
          const productTotalBeforeTax = product.prixUnitaire * quantity;
          const taxAmount = (product.taxe / 100) * productTotalBeforeTax;
          const productTotal = productTotalBeforeTax + taxAmount;

          totalAmount += productTotal;

          return {
            productId: product.productID,
          //  productName: product.name,
            quantity: quantity,
            total: productTotal
          };
        }
      }
      return null;
    })
    .filter(product => product !== null);

  if (!this.isQuantityValid()) {
    this.messageService.add({
      severity: 'error',
      summary: 'Invalid Quantity',
      detail: 'Some products have quantities that exceed the available stock.'
    });
    return;
  }

  const invoiceData = {
    montantTotal: totalAmount,
    dateEmission: this.invoice.dateEmission,
    dateEcheance: this.invoice.dateEcheance,
    banqueId: this.invoice.compteID,
    clientId: this.invoice.clientID,
    products: productsToSend
  };

  console.log('Invoice Data to be sent:', invoiceData);

  this.factureVenteService.createFactureVente(invoiceData).subscribe(
    response => {
      this.messageService.add({ severity: 'success', summary: 'Invoice Created', detail: 'The invoice has been successfully created.' });
      console.log('Invoice created successfully:', response);
      this.displayCreateInvoice = false;
      this.getFactureVentes();
    },
    error => {
      console.error('Error creating invoice:', error);
    }
  );
}
  

  
  factureVentes: any[] = [];
  displayDialog: boolean = false;
  selectedFactureVente: any = {};

  closeDialog(): void {
    this.displayDialog = false;
  }

  
generatePDF(invoice: any) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Invoice Details', 14, 20);
  
  // Invoice Information
  doc.setFontSize(12);
  doc.text(`Invoice ID: ${invoice.billID}`, 14, 30);
  doc.text(`Issue Date: ${new Date(invoice.dateEmission).toLocaleDateString()}`, 14, 40);
  doc.text(`Due Date: ${new Date(invoice.dateEcheance).toLocaleDateString()}`, 14, 50);
  doc.text(`Total Amount: ${invoice.montantTotal.toFixed(2)} USD`, 14, 60);
  doc.text(`Payment Type: ${invoice.paymentType}`, 14, 70);
  
  doc.text('--------------------------------------------------------', 14, 80);

  // Supplier Information
  doc.text('Supplier Information', 14, 90);
  doc.text(`Name: ${invoice.client.name}`, 14, 100);
  doc.text(`Address: ${invoice.client.adresse}`, 14, 110);
  doc.text(`Email: ${invoice.client.email}`, 14, 120);
  doc.text(`Phone: ${invoice.client.numeroTel}`, 14, 130);
  
  doc.text('--------------------------------------------------------', 14, 140);

  // Product Table
  const productTableData = invoice.products.map((product: any) => [
    product.name,
    product.prixUnitaire.toFixed(2),
    product.quantiteEnStock,
    `${product.taxe}%`,
    (invoice.montantTotal).toFixed(2)
  ]);

  autoTable(doc, {
    startY: 150,
    head: [['Product Name', 'Unit Price (USD)', 'Quantity', 'Tax (%)', 'Total Price (USD)']],
    body: productTableData,
    theme: 'grid',
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' }
    },
    styles: { fontSize: 10, cellPadding: 4 }
  });

  // Save the PDF
  doc.save(`invoice_${invoice.billID}.pdf`);
}
}
