import { Component, OnInit } from '@angular/core';
import { StatusDevis } from '../../models/enums/StatusDevis';
import { Client } from '../../models/Client';
import { ClientService } from '../../../shared/sales/client.service';
import { DevisService } from '../../../shared/sales/devis.service';
import { Product } from '../../models/Product';
import { ProductService } from '../../../shared/products/product.service';


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-quetos',
  templateUrl: './quetos.component.html',
  styleUrls: ['./quetos.component.scss']
})

export class QuetosComponent implements OnInit {

  displayCreateInvoice: boolean = false;
  selectedDevis: any = {}; // For the update form
  Devis: any[] = [];
  displayDialog: boolean = false;
  selectedFactureVente: any = {};
  Invoice: any = {};
  statut = ['APPROVED','PENDING', 'REFUSED'];
 
  clients: Client[] = [];
  products: Product[] = [];
  selectedClient : {client: Client["clientID"]| undefined}[] = []; 
  selectedProducts: { product: Product["productID"] | undefined, quantity: number, stock:Product["quantiteEnStock"] }[] = [];
  minDate: Date = new Date(); 
  maxDate: Date = new Date(2025, 11, 31);

  invoice = {   
    montantTotal: 0,
    clientID: 0,
    dateCreation: new Date(), 
    dateExpiration: new Date(),  
    statut: '',   
    selectedClient: {} as Client, 
    selectedProducts: [   // This is the updated array of products
      { 
        name: '', 
        prixUnitaire: 0, 
        taxe: 0, 
        quantity: 0 
      },
      { 
        name: '', 
        prixUnitaire: 0, 
        taxe: 0, 
        quantity: 0 
      }
    ]
  };
  

  constructor(
    private devisService : DevisService,    
    private confirmationService: ConfirmationService,
    private clientService: ClientService,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getDevis();
    this.getClients();
    this.getProducts();  
  }

  // Fetch all invoice data
  getDevis(): void {
    this.devisService.getAllDevis().subscribe(
      (data: any[]) => {
        this.Devis = data;
        console.log('les devis :', data)
      },
      (error) => console.error('Error fetching FactureVente data', error)
    );
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (data: Client[]) => this.clients = data,
      (error) => console.error('Error fetching client data', error)
    );
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
  this.selectedProducts.push({ product: undefined, quantity: 1 , stock:0});
}

  onProductSelect(index: number): void {
    const selectedProduct = this.selectedProducts[index];
    if (selectedProduct && selectedProduct.product) {
      console.log(`Selected product: ${selectedProduct.product} (ID: ${selectedProduct.product})`);
    } else {
      console.log('No product selected or product is undefined.');
    }
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
              product: {
                productID: product.productID,
                name: product.name,
                description: product.description,
                prixUnitaire: product.prixUnitaire,
                quantiteEnStock: product.quantiteEnStock,
                taxe: product.taxe
              },
              quantity: productData.quantity
            };
          }
        }
        return null;
      })
      .filter(product => product !== null);
  
    const invoiceData = {
      dateCreation: this.invoice.dateCreation,
      dateExpiration: this.invoice.dateExpiration,
      montantTotal: totalAmount,
      statut: this.invoice.statut,
      client: {
        clientID: this.invoice.clientID
      },
      devisProducts: productsToSend
    };
  
    console.log('Invoice Data to be sent:', invoiceData);
    
    this.devisService.createDevis(invoiceData).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Invoice Created', detail: 'The invoice has been successfully created.' });
        console.log('Invoice created successfully:', response);
        this.displayCreateInvoice = false;
        this.getDevis();
      },
      error => {
        console.log('Invoice to be created values:', invoiceData);
        console.error('Error creating invoice:', error);
      }
    );
  }
  
// Update Devis
updateQuote(devis: any): void {
  this.displayDialog = true;
  this.selectedDevis = { ...devis }; // This ensures you are passing the correct quote data
  // Ensure products are correctly initialized (if available)
  this.selectedProducts = devis.products ? [...devis.products] : []; 
}

// Save Updated Devis
saveUpdatedDevis(): void {
  if (this.selectedDevis.devisId) {
    const totalAmount = this.selectedDevis.devisProducts.reduce((sum: number, productData: { productID: number; quantity: number; }) => {
      const product = this.products.find(p => p.productID === productData.productID);
      const productTotalBeforeTax = product!.prixUnitaire * productData.quantity || 0;
      const taxAmount = (product!.taxe / 100) * productTotalBeforeTax;
      return sum + productTotalBeforeTax + taxAmount;
    }, 0);

    const updatedDevis = {
      ...this.selectedDevis,
      montantTotal: totalAmount,
      devisProducts: this.selectedDevis.devisProducts
    };

    this.devisService.updateDevis(this.selectedDevis.devisId, updatedDevis).subscribe(
      (updatedDevis) => {
        const index = this.Devis.findIndex((devis) => devis.devisId === updatedDevis.devisId);
        if (index !== -1) {
          this.Devis[index] = updatedDevis;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Quote updated successfully.',
        });
        this.displayDialog = false;
        this.selectedDevis = {};
        this.selectedProducts = [];
      },
      (error) => {
        console.error('Error updating quote:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update quote.',
        });
      }
    );
  } else {
    console.error('Devis ID is missing or invalid');
  }
}


// Delete Devis
deleteQuote(devisId: number): void {
  if (confirm('Are you sure you want to delete this quote?')) {
    this.devisService.deleteDevis(devisId).subscribe(
      () => {
        // Remove from the local list
        this.Devis = this.Devis.filter(
          (devis) => devis.devisId !== devisId
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Quote deleted successfully.',
        });
        this.getDevis()
      },
      (error) => {
        console.error('Error deleting quote:', error);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Quote deleted successfully.',
        });
        this.getDevis()
      }
    );
  }
}
  
 

closeDialog(): void {
    this.displayDialog = false;
  }

  
// generatePDF(invoice: any) {
//   const doc = new jsPDF();

//   // Title
//   doc.setFontSize(18);
//   doc.text('Invoice Details', 14, 20);
  
//   // Invoice Information 

//   doc.setFontSize(12);
//   doc.text(`Devis ID: ${invoice.devisId}`, 14, 30);
//   doc.text(`Issue Date: ${new Date(invoice.dateCreation).toLocaleDateString()}`, 14, 40);
//   doc.text(`Due Date: ${new Date(invoice.dateExpiration).toLocaleDateString()}`, 14, 50);
//   doc.text(`Total Amount: ${invoice.montantTotal.toFixed(2)} USD`, 14, 60);
//   doc.text(`Payment Type: Devis for ${invoice.client.name}`, 14, 70);
  
//   doc.text('-----------------------------------------------------------------------------', 14, 80);

//   // Supplier Information
//   doc.text('Supplier Information', 14, 90);
//   doc.text(`Name: ${invoice.client.name}`, 14, 100);
//   doc.text(`Address: ${invoice.client.adresse}`, 14, 110);
//   doc.text(`Email: ${invoice.client.email}`, 14, 120);
//   doc.text(`Phone: ${invoice.client.numeroTel}`, 14, 130);
  
//   doc.text('-----------------------------------------------------------------------------', 14, 140);

//   // Product Table
//   const productTableData = invoice.products.map((product: any) => [
//     product.name,
//     product.prixUnitaire.toFixed(2),
//     product.quantiteEnStock,
//     `${product.taxe}%`,
//     (invoice.montantTotal).toFixed(2)
//   ]);

//   autoTable(doc, {
//     startY: 150,
//     head: [['Product Name', 'Unit Price (USD)', 'Quantity', 'Tax (%)', 'Total Price (USD)']],
//     body: productTableData,
//     theme: 'grid',
//     columnStyles: {
//       0: { halign: 'left' },
//       1: { halign: 'right' },
//       2: { halign: 'right' },
//       3: { halign: 'right' },
//       4: { halign: 'right' }
//     },
//     styles: { fontSize: 10, cellPadding: 4 }
//   });

//   // Save the PDF
//   doc.save(`invoice_${invoice.billID}.pdf`);
// }

generatePDF(invoice: any) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Invoice Details', 14, 20);

  doc.setFontSize(12);  
  doc.text(`Issue Date: ${new Date(invoice.dateCreation).toLocaleDateString()}`, 14, 40);
  doc.text(`Due Date: ${new Date(invoice.dateExpiration).toLocaleDateString()}`, 14, 50);
  doc.text(`Total Amount: ${invoice.montantTotal.toFixed(2)} USD`, 14, 60);
  doc.text(`Payment Type: Devis for ${invoice.client.name}`, 14, 70);
  
  doc.text('-----------------------------------------------------------------------------', 14, 80);

  doc.text('Supplier Information', 14, 90);
  doc.text(`Name: ${invoice.client.name}`, 14, 100);
  doc.text(`Address: ${invoice.client.adresse}`, 14, 110);
  doc.text(`Email: ${invoice.client.email}`, 14, 120);
  doc.text(`Phone: ${invoice.client.numeroTel}`, 14, 130);
  
  doc.text('-----------------------------------------------------------------------------', 14, 140);

  const productTableData = invoice.devisProducts.map((product: any) => [
    product.product.name,
    product.product.prixUnitaire.toFixed(2),
    product.quantity,
    `${product.product.taxe}%`,
    (product.product.prixUnitaire * product.quantity).toFixed(2)
  ]);

  autoTable(doc, {
    startY: 150,
    head: [['Product Name', 'Unit Price (USD)', 'Quantity', 'Tax (%)', 'Total Price (TND) without tax']],
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

  doc.save(`invoice_${invoice.devisId}.pdf`);
}

}
