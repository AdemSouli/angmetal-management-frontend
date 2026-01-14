import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginRequest } from 'src/app/auth/models/login-request.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 
  loginRequest: LoginRequest;
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router, private userService: UserService,
    private fb: FormBuilder) {
    this.loginRequest = {
      username: "",
      password: ""
    }
  }

  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          this.noWhitespaceValidator
        ]
      ],
      
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(64),
          this.noWhitespaceValidator
        ]
      ],    })
  }

  login() {
    console.log(this.loginRequest)
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.login(this.loginRequest).subscribe((response) => {
        if (this.authService.isUserLoggedIn() && this.authService.isAuthenticated()) {
          this.router.navigateByUrl("/home")
        }
        
        this.isLoading = false
        return this.messageService.add({
          severity: response.statusCode === 200 ? 'success' : 'error',
          detail: response.statusCode === 200 ? "Connected successfully" : response.exception === "Bad credentials" ? "Please verify your informations" : response.exception,
          summary: response.statusCode === 200 ? 'Success' : 'Error'
        })
      }, (error) => {
        this.isLoading = false
        console.error(error)
      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }
  navigateToRegister(){
    
  }
}