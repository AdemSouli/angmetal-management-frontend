import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../../../shared/purshas/fournisseur.service';
import { Fournisseur } from '../../models/Fournisseur';
import { MessageService } from 'primeng/api'; // Import MessageService

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
  providers: [MessageService] // Add MessageService to providers
})
export class VendorsComponent implements OnInit {

  vendors: Fournisseur[] = []; // Array to store vendor data
  displayDialog: boolean = false; // Controls dialog visibility for add/edit
  selectedVendor: any = {}; // Object to hold selected vendor for edit
  newVendor: boolean = false; // Flag to differentiate between add and edit operations

  constructor(
    private vendorsService: FournisseurService,
    private messageService: MessageService // Inject MessageService
  ) { }

  ngOnInit(): void {
    this.getVendors(); // Fetch vendors data on initialization
  }

  // Fetch the list of vendors
  getVendors(): void {
    this.vendorsService.getVendors().subscribe(
      (data: any[]) => {
        console.log('list de fournisseur from back end', data);
        this.vendors = data;
      },
      (error) => {
        console.error('Error fetching vendors', error);
        this.showErrorMessage('Error fetching vendors', error);
      }
    );
  }

  // Open dialog to add a new vendor
  openAddVendorDialog(): void {
    this.selectedVendor = {}; // Reset the selected vendor
    this.newVendor = true; // Set flag for add operation
    this.displayDialog = true; // Show dialog
  }

  // Open dialog to edit an existing vendor
  openEditVendorDialog(vendor: any): void {
    this.selectedVendor = { ...vendor }; // Copy vendor data for editing
    this.newVendor = false; // Set flag for edit operation
    this.displayDialog = true; // Show dialog
  }

  // Save vendor (add or edit)
  saveVendor(): void {
    if (this.newVendor) {
      this.vendorsService.createVendor(this.selectedVendor).subscribe(
        () => {
          this.getVendors(); // Refresh vendor list
          this.displayDialog = false; // Close dialog
          this.showSuccessMessage('Vendor created successfully');
        },
        (error) => {
          console.error('Error creating vendor', error);
          this.showErrorMessage('Error creating vendor', error);
        }
      );
    } else {
      this.vendorsService.updateVendor(this.selectedVendor.fournisseurID, this.selectedVendor).subscribe(
        () => {
          this.getVendors(); // Refresh vendor list
          this.displayDialog = false; // Close dialog
          this.showSuccessMessage('Vendor updated successfully');
        },
        (error) => {
          console.error('Error updating vendor', error);
          this.showErrorMessage('Error updating vendor', error);
        }
      );
    }
  }

  // Delete vendor
  deleteVendor(id: string): void {
    this.vendorsService.deleteVendor(id).subscribe(
      () => {
        this.getVendors(); // Refresh vendor list
        this.showSuccessMessage('Vendor deleted successfully');
      },
      (error) => {
        console.error('Error deleting vendor', error);
        this.showErrorMessage('Error deleting vendor', error);
      }
    );
  }

  // Close dialog without saving
  closeDialog(): void {
    this.displayDialog = false;
  }

  // Show success message
  showSuccessMessage(detail: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: detail });
  }

  // Show error message
  showErrorMessage(summary: string, error: any): void {
    this.messageService.add({ severity: 'error', summary: summary, detail: error.message || 'An error occurred' });
  }
}
