import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../../../shared/timesheet/timesheet.service';
import { Timesheet } from '../../models/timesheet';
import { ReportService } from 'src/app/shared/timesheet/report.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core'; // Import FullCalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import { EventInput } from '@fullcalendar/core'; // Import EventInput for event typing

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [MessageService]
})
export class TimesheetComponent implements OnInit {
  timesheets: Timesheet[] = [];
  selectedTimesheet: Timesheet = {
    id: 0,
    heuresTravaillees: 0,
    date: new Date(),
    report: {
      typeRapport: ''
    }
  };
  displayCreate: boolean = false;
  reportOptions: any;
  events: EventInput[] = []; // Store FullCalendar events

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin], // Pass actual plugins here
    initialView: 'dayGridMonth',
    eventClick: this.onEventClick, // Handle event clicks
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
  };
  calendarComponent: any;
  displayEdit: boolean = false;

  constructor(
    private reportService: ReportService,
    private timesheetService: TimesheetService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadTimesheets();
    this.loadReports();
  }

  loadReports() {
    this.reportService.getReports().subscribe(data => {
      this.reportOptions = data;
    });
  }

  loadTimesheets(): void {
    this.timesheetService.getAllTimesheets().subscribe(data => {
      this.timesheets = data;
      this.formatEvents(); // Format the events for FullCalendar
    });
  }

  formatEvents() {
    // Format timesheets into FullCalendar events
    this.events = this.timesheets.map(timesheet => ({
      title: `${timesheet.heuresTravaillees} hrs - ${timesheet.report.typeRapport}`, // Show both hours and report type
      start: timesheet.date, // Using date as event start
      extendedProps: {
        report: timesheet.report.typeRapport,
        heuresTravaillees: timesheet.heuresTravaillees // Optional: Additional event data
      },
      backgroundColor: '#00aaff', // Custom color for the event (optional)
      description: `Report Type: ${timesheet.report.typeRapport}`, // Optional: Additional info for tooltip
    }));
  }

  openCreateTimesheetDialog(): void {
    this.selectedTimesheet = { 
      id: 0,
      heuresTravaillees: 0,
      date: new Date(),
      report: { typeRapport: '' }
    };
    this.displayCreate = true;
  }

  createTimesheet(): void {
    // Format the date before sending
    const formattedDate = this.datePipe.transform(this.selectedTimesheet.date, 'yyyy-MM-dd');
    
    // Construct the object to send to the backend
    const timesheetToSend = {
      heuresTravaillees: this.selectedTimesheet.heuresTravaillees,
      date: formattedDate,
      report: this.selectedTimesheet.report
    };

    this.timesheetService.createTimesheet(timesheetToSend).subscribe(
      response => {
        this.loadTimesheets();  // Reload timesheets list
        this.displayCreate = false;  // Close the dialog

        // Show success message
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet created successfully' });
      },
      error => {
        console.error('Error creating timesheet', error);

        // Show error message
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating timesheet' });
      }
    );
  }

  closeCreateDialog(): void {
    this.displayCreate = false;
  }

  onEventClick(eventInfo: any) {
    // Open the edit dialog with the event's data
    this.selectedTimesheet = { 
      id: eventInfo.event.id,
      heuresTravaillees: eventInfo.event.extendedProps.heuresTravaillees,
      report: eventInfo.event.extendedProps.report,
      date: eventInfo.event.start
    };
    this.displayEdit = true;  // Show your edit dialog
  }
  
  updateEvent() {
    // Here, you can update the event data
    const updatedEvent = {
      id: this.selectedTimesheet.id,
      start: this.selectedTimesheet.date,
      extendedProps: {
        heuresTravaillees: this.selectedTimesheet.heuresTravaillees,
        report: this.selectedTimesheet.report
      }
    };
  
    // Update the event in FullCalendar
    const event = this.calendarComponent.getEventById(this.selectedTimesheet.id);
    if (event) {
      event.setProp('start', updatedEvent.start);
      event.setExtendedProp('heuresTravaillees', updatedEvent.extendedProps.heuresTravaillees);
      event.setExtendedProp('report', updatedEvent.extendedProps.report);
    }
  
    // Optionally, save the updated event to the server
    // Call your service to update the timesheet data
    this.timesheetService.updateTimesheet(this.selectedTimesheet.id,this.selectedTimesheet).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Timesheet updated successfully' });
      this.loadTimesheets();
      this.displayEdit = false;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating timesheet' });
    });
  }
  

  
}
