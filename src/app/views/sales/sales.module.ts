import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { QuetosComponent } from './quetos/quetos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ClientsComponent,
    InvoicesComponent,
    QuetosComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,  
    ButtonModule,  
    InputTextModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    PanelModule,
    ToastModule
   
  ],
  providers:[MessageService,ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA] 

})
export class SalesModule { }
