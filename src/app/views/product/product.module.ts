import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../shared/products/product.service';
import { ItemsComponent } from './items/items.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CardModule} from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    PaginatorModule
    
  ],

 providers:[ProductService,MessageService, ConfirmationService],
 schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA] 
})
export class ProductModule { }
