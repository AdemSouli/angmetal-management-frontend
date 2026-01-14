import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanqueRoutingModule } from './banque-routing.module';
import { BanqueComponent } from './banque.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    BanqueComponent
  ],
  imports: [
    CommonModule,
    BanqueRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule
  ],
  providers:[MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA] 
})
export class BanqueModule { }
