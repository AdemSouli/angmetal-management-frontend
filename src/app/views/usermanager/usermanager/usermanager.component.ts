import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    roles: string[];
}

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class UsermanagerComponent implements OnInit {
  isEditing: boolean = false;
  displayEditUser: boolean = false;
  roles: string[] = ['ADMIN', 'COMPUTABLE', 'EMPLOYEE'];
  users: User[] = [];
  selectedUser: User = this.initializeUser();
  userForm: FormGroup;

  constructor(
    private usersService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      roles: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private initializeUser(): User {
    return {
      id: 0,
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      roles: []
    };
  }

  private loadUsers(): void {
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data.data.users;
    });
  }

  showNewUserDialog(): void {
    this.isEditing = false;
    this.selectedUser = this.initializeUser();
    this.displayEditUser = true;
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.selectedUser = { ...user };
    this.userForm.patchValue(this.selectedUser);
    this.displayEditUser = true;
  }

  confirmDelete(user: User): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      this.loadUsers();
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields correctly.' });
      return;
    }

    const userToSave = {
      ...this.userForm.value,
      id: this.selectedUser.id,
      roles: Array.isArray(this.userForm.value.roles)
        ? this.userForm.value.roles
        : [this.userForm.value.roles]
    };

    const saveOperation = this.selectedUser.id === 0
      ? this.usersService.createUser(userToSave)
      : this.usersService.updateUser(userToSave);

    saveOperation.subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message || 'Operation successful.' });
       // this.loadUsers();
        this.displayEditUser = false;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message || 'An error occurred while saving the user.' });
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
