import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RegisterRequest } from '../../../auth/models/register-request.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CompanyService } from '../../../shared/company/company.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit{
  companies: any[] = [];
  availableRoles: string[] = ['ROLE_COMPTABLE', 'ROLE_EMPLOYEE'];

  isLoading: boolean = false;
  user: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    companyId:'',
    roles: []
  };

  constructor(
    private authService: AuthService,
    private companyService : CompanyService,
    private messageService: MessageService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        console.log('haw el companies ja',data)
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  
  }

  /** Handles the form submission process. */
  signup(): void {
    console.log('User data to be sent to the backend:', this.user);

    // Ensure roles are populated if empty
    if (!this.user.roles.length) {
      this.showErrorMessage('Please select at least one role.');
      return;
    }

    // Validate required fields
    if (!this.isFormValid()) {
      this.showErrorMessage('Please fill all required fields with valid data.');
      return;
    }

    // Start loading and create the register request object
    this.isLoading = true;
    const registerRequest: RegisterRequest = this.createRegisterRequest();

    console.log('Register request object:', registerRequest);

    // Make API call
    this.authService.register(registerRequest).pipe(
      catchError(error => {
        this.handleError('An error occurred while registering. Please try again later.');
        console.error('Registration error:', error);
        return of(null); // Prevent breaking the observable chain
      })
    ).subscribe(response => this.handleResponse(response));
  }

  /** Creates the register request object */
  private createRegisterRequest(): RegisterRequest {
    // Ensure roles is an array
    const roles = Array.isArray(this.user.roles) ? this.user.roles : [this.user.roles.trim()];
  
    return {
      username: this.user.username.trim(),
      email: this.user.email.trim(),
      password: this.user.password,
      firstName: this.user.firstName?.trim(),
      lastName: this.user.lastName?.trim(),
      address: this.user.address?.trim(),
      phoneNumber: this.user.phoneNumber?.trim(),
      companyId: this.user.companyId?.trim(),
      roles: roles.map(role => role.trim()) // Ensure roles are properly formatted
    };
  }
  

  /** Validates the form inputs. */
  private isFormValid(): boolean {
    // Check for required fields and their validity
    return this.isFieldValid(this.user.username, 6, 24) &&
      this.isFieldValid(this.user.email, 5, 100, this.isEmailValid) &&
      this.isFieldValid(this.user.password, 6, 64);
  }

  /** Generic field validation */
  private isFieldValid(value: string, minLength: number, maxLength: number, customValidation?: (value: string) => boolean): boolean {
    const noWhitespace = (val: string) => !!val && !/\s/.test(val);
    return value.length >= minLength && value.length <= maxLength && noWhitespace(value) && (customValidation ? customValidation(value) : true);
  }

  /** Email specific validation */
  private isEmailValid(value: string): boolean {
    return value.includes('@');
  }

  /** Show error messages */
  private showErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: message
    });
  }

  /** Handles the response from the registration API. */
  private handleResponse(response: any): void {
    this.isLoading = false;
    if (response?.statusCode === 200) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response.message
      });
      this.router.navigateByUrl('/login');
    } else {
      this.handleError(response?.exception || 'Registration failed. Please try again.');
    }
  }

  /** Displays an error message. */
  private handleError(message: string): void {
    this.isLoading = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
