import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../../shared/products/product.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {
  products: Product[] = [];
  display: boolean = false;
  selectedProduct: Product = new Product();
  isEdit: boolean = false;
  taxOptions: number[] = [7, 9, 12, 17, 19];
  // Pagination properties
  first: number = 0;
  rows: number = 10;
  isLoaded: boolean = false
  // Paginated products array
  paginatedProducts: any[] | undefined;
  constructor(
    private productService: ProductService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.paginateProducts();
  }

  // Function to paginate products based on 'first' and 'rows'
  paginateProducts() {
    // Make sure we paginate only when data is loaded
    if (this.isLoaded && this.products.length > 0) {
      this.paginatedProducts = this.products.slice(this.first, this.first + this.rows);
    }
  }

  // Watch for changes in pagination and update displayed products
  onPageChange(event: any) {
    this.first = event.first;  
    this.rows = event.rows;      
    this.paginateProducts();  // Re-paginate when pagination changes
  }

  // Load products from the service
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.isLoaded = true;
        this.paginateProducts();  // Now paginate after data is loaded
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading products.' });
      }
    );
  }

  goToAddProduct(): void {
    this.selectedProduct = new Product();
    this.isEdit = false;
    this.display = true;
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.isEdit = true;
    this.display = true;
  }

  saveProduct(): void {
    if (this.selectedProduct.productID) {
      this.productService.updateProduct(this.selectedProduct.productID, this.selectedProduct).subscribe(
        (response) => {
          this.loadProducts();
          this.display = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully.' });
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating product.' });
        }
      );
    } else {
      this.productService.createProduct(this.selectedProduct).subscribe(
        (response) => {
          this.loadProducts();
          this.display = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully.' });
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding product.' });
        }
      );
    }
  }

  deleteProduct(productID: number): void {
    // Using PrimeNG ConfirmationService for the confirmation dialog
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productID).subscribe(
          () => {
            this.loadProducts();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully.' });
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product.' });
          }
        );
      },
      reject: () => {
        console.log('Product deletion rejected');
      }
    });
  }

  closeDialog(): void {
    this.display = false;
  }
}
