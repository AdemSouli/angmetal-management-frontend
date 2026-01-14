import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurshaseRoutingModule } from './purshase-routing.module';
import { BillsComponent } from './bills/bills.component';
import { VendorsComponent } from './vendors/vendors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    BillsComponent,
    VendorsComponent,

  ],
  imports: [
    CommonModule,
    PurshaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,  
    ButtonModule,  
    InputTextModule,
    TableModule, 
    MultiSelectModule,
    CalendarModule,
    PanelModule,
    DropdownModule,
    ToastModule,
    CardModule
    
  ],
  providers:[MessageService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA] 
})
export class PurshaseModule { }
