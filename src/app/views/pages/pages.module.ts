import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import {
  ButtonModule,
  CardModule,
  GridModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JwtModule,JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthGuard } from 'src/app/auth/auth/guards/auth.guard';
import { LoginGuard } from 'src/app/auth/auth/guards/login.guard';
//import { AuthInterceptor } from './auth.interceptor'; // Assuming you've implemented the interceptor

export function tokenGetter() {
  return localStorage.getItem("accessToken"); // Use localStorage for persistence across sessions
}

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.domainUrl],
        authScheme: "Bearer ",
      }
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard, 
    AuthService, 
    JwtHelperService, 
    MessageService, 
   
    ConfirmationService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Add interceptor
  ],
})
export class PagesModule {}
