import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TimetrackingRoutingModule } from './timetracking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ButtonModule } from 'primeng/button';
import {  TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReportsComponent } from './reports/reports.component';
import { ProjectsComponent } from './projects/projects.component';
import { DropdownModule } from 'primeng/dropdown';
import {  ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    ReportsComponent,
    ProjectsComponent,
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    TimetrackingRoutingModule,       
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    FullCalendarModule, // Import the FullCalendarModule for the calendar
    DialogModule, // For dialog components
    ButtonModule, // For p-button
    InputTextModule, // For input fields
    DropdownModule, // For dropdowns
    CalendarModule, // For p-calendar (date picker)
    ToastModule, // For toast notifications
    
    ToastModule  
  ],
  providers:[MessageService,DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA] 
})
export class TimetrackingModule { }
