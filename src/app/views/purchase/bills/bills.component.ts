import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BanqueService } from '../../../shared/banks/banque.service';
import { ProductService } from '../../../shared/products/product.service';
import { FournisseurService } from '../../../shared/purshas/fournisseur.service';
import { PurshaseInvoiceService } from '../../../shared/purshas/facture-achat.service';
import { Banque } from '../../models/Banque';
import { Fournisseur } from '../../models/Fournisseur';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})

export class BillsComponent implements OnInit {
  displayCreateInvoice: boolean = false;
  factureAchats: any[] = [];
  displayDialog: boolean = false;
  selectedFactureVente: any = {};
  newInvoice: any = {};
  paymentType = ['DEBIT'];
  banques:Banque[] = [];cdr: any;
  isCollapsed: boolean[] = [];
  fournisseurs: Fournisseur[] = [];
  products: Product[] = [];
  selectedFournisseur: Fournisseur = {} as Fournisseur;
  selectedBanque: Banque = {} as Banque;

  selectedProducts: { product: Product["productID"] | undefined, quantity: number }[] = [];
  minDate: Date = new Date(); 
  maxDate: Date = new Date(2025, 11, 31); 

  invoice = {   
    montantTotal: 0,
    compteID: 0 , 
    fournisseurID:0,
    dateEmission: new Date(), 
    dateEcheance: new Date(),  
    paymentType: "DEBIT",
    selectedBanque: {} as Banque,
    selectedFournisseur: {} as Fournisseur, 
    selectedProducts: []  
  };

  constructor(
    private factureAchatService: PurshaseInvoiceService,
    private fournisseurService: FournisseurService,
    private productService: ProductService,
    private banqueService : BanqueService,
    private messageService: MessageService
  ) {

    this.invoice.fournisseurID = this.selectedFournisseur?.fournisseurID || 0;
    this.invoice.compteID = this.selectedBanque?.compteID || 0;
  }

  ngOnInit(): void {
    this.getFactureAchat();
    this.getFournisseurs();
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
  getFactureAchat(): void {
    this.factureAchatService.getBills().subscribe(
      (data: any[]) =>{console.log('list of factures achat',data),this.factureAchats = data} ,
      
      (error) => console.error('Error fetching FactureVente data', error)
    );
  }

  // Fetch all clients
  getFournisseurs(): void {
    this.fournisseurService.getVendors().subscribe(
     
      (data) => {
        console.log('this is the list of vendors', data)
        this.fournisseurs = data
      },
      (error) => console.error('Error fetching fournisseur data', error)
    );
  }

  // Fetch all products
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
    const selectedProduct = this.selectedProducts[index];
    if (selectedProduct && selectedProduct.product) {
      console.log(`Selected product: ${selectedProduct.product} (ID: ${selectedProduct.product})`);
    } else {
      console.log('No product selected or product is undefined.');
    }
  }
  

onFournisseurSelect(index: number): void {
  const selectedFournisseur = this.fournisseurs[index]; 
  if (selectedFournisseur) {
    this.invoice.fournisseurID = selectedFournisseur.fournisseurID; 
    console.log(`Selected fournisseur: ${selectedFournisseur.name} (ID: ${selectedFournisseur.fournisseurID})`);
  } else {
    console.log('No fournisseur selected or fournisseur is undefined.');
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

  createInvoice(): void {
    let totalAmount = 0;
  
    const productsToSend = this.selectedProducts
  .map(productData => {
    if (productData.product !== undefined) {
      const product = this.products.find(p => p.productID === productData.product);  
      if (product) {
        const productTotalBeforeTax = product.prixUnitaire * productData.quantity;

        const taxAmount = (product.taxe / 100) * productTotalBeforeTax;

        const productTotal = productTotalBeforeTax + taxAmount;

        totalAmount += productTotal;

        return {
          productId: product.productID,
         // productName: product.name,
          quantity: productData.quantity,
          total: productTotal
        };
      }
    }
    return null;
  })
  .filter(product => product !== null);  
   
    const invoiceData = {
      montantTotal: totalAmount, 
      dateEmission: this.invoice.dateEmission,  
      dateEcheance: this.invoice.dateEcheance, 
      banqueId: this.invoice.compteID,  
      fournisseurId: this.invoice.fournisseurID,  
      products: productsToSend  
    };
  
    console.log('Invoice Data to be sent:', invoiceData);
    
    this.factureAchatService.createBill(invoiceData).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Invoice Created', detail: 'The invoice has been successfully created.' });

        console.log('Invoice created successfully:', response);
        this.displayCreateInvoice = false;
        this.getFactureAchat();
      },
      error => {
        console.error('Error creating invoice:', error);
      }
    );
  }
  


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
    
    doc.text('-----------------------------------------------------------------------------------------------', 14, 80);
  
    // Supplier Information
    doc.text('Supplier Information', 14, 90);
    doc.text(`Name: ${invoice.fournisseur.name}`, 14, 100);
    doc.text(`Address: ${invoice.fournisseur.adresse}`, 14, 110);
    doc.text(`Email: ${invoice.fournisseur.email}`, 14, 120);
    doc.text(`Phone: ${invoice.fournisseur.numeroTel}`, 14, 130);
    
    doc.text('----------------------------------------------------------------------------------------------', 14, 140);
  
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
