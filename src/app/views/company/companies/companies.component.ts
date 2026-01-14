import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/company/company.service';
import { MessageService } from 'primeng/api';  // Import MessageService

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies = [];
  selectedCompany: any = {};
  display = false;
  userRole: string = '';  // Store the user's role

  constructor(
    private companyService: CompanyService,
    private messageService: MessageService  // Inject MessageService
  ) {}

  ngOnInit(): void {
    this.loadAllCompanies();

    // Get token from sessionStorage (or wherever it's stored)
    const token = sessionStorage.getItem('userRoles');
    
    // If token exists, extract the role from it
    if (token) {
      this.userRole = this.extractRoleFromToken(token);
    }
  }

  // Helper method to decode the role from the token (assuming it's a JWT)
  extractRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.role || 'guest'; // Adjust based on your JWT structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'guest'; // Default role if decoding fails
    }
  }

  // Go to Add Company (for opening a dialog to add a new company)
  goToAddCompany() {
    this.selectedCompany = {}; // Clear any previously selected company
    this.display = true; // Open the dialog for adding a new company
  }

  // Go to Edit Company (for opening a dialog to edit an existing company)
  goToEditCompany(company: any) {
    console.log('Editing company:', company); // Debugging log
    this.selectedCompany = { ...company };
    this.display = true;
  }

  // Load all companies from the backend
  loadAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        console.log('Companies fetched from backend:', data);
        this.companies = data;
      },
      (error) => {
        console.error('Error loading companies', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to load companies.'});
      }
    );
  }

  // Save the company (create or update based on selection)
  saveCompany() {
    console.log('Selected company for save:', this.selectedCompany);
    if (this.selectedCompany.name && this.selectedCompany.location) {
      if (this.selectedCompany.id) {
        console.log('Updating company...');
        this.updateCompany();
      } else {
        console.log('Creating new company...');
        this.createCompany();
      }
    } else {
      console.error('Please fill out the form correctly');
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill out the form correctly.'});
    }
  }

  // Create a new company
  createCompany() {
    this.companyService.createCompany(this.selectedCompany).subscribe(
      (response) => {
        console.log('Company created successfully', response);
        this.loadAllCompanies(); // Refresh the company list after creation
        this.closeDialog(); // Close the form
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company created successfully.'});
      },
      (error) => {
        console.error('Error creating company', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error creating company.'});
      }
    );
  }

  // Update an existing company
  updateCompany() {
    console.log('Updating company:', this.selectedCompany);
    this.companyService.updateCompany(this.selectedCompany.id, this.selectedCompany).subscribe(
      (response) => {
        console.log('Company updated successfully', response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company updated successfully.'});
        this.loadAllCompanies();
        this.closeDialog();
      },
      (error) => {
        console.error('Error updating company', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error updating company.'});
      }
    );
  }

  // Delete a company by ID
  deleteCompany(companyId: number) {
    this.companyService.deleteCompany(companyId).subscribe(
      (response) => {
        console.log('Company deleted successfully:', response);
        this.loadAllCompanies(); // Refresh the list after deletion
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company deleted successfully.'});
      },
      (error) => {
        console.error('Error deleting company', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error deleting company.'});
      }
    );
  }

  // Close the dialog without saving
  closeDialog() {
    this.display = false;
  }
}
