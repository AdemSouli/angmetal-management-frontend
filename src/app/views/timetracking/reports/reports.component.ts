
  import { Component, OnInit } from '@angular/core';
  import { ReportService } from '../../../shared/timesheet/report.service';
  import { MessageService } from 'primeng/api';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import {Report} from '../../models/Report'

  
  @Component({
    selector: 'app-report',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [MessageService]
  })
  export class ReportsComponent implements OnInit {
    reports: Report[] = [];
    selectedReport: Report = this.initializeReport();
    display: boolean = false;
  
    constructor(
     
      private reportService: ReportService,
      private messageService: MessageService
    ) {}
  
    ngOnInit(): void {
      this.loadReports();
    }
  
    private initializeReport(): Report {
      return {
        reportId: 0,
        typeRapport: '',
        periodeDebut:  null,  
        periodeFin:  null,
        budget: 0
      };
    }
  
    loadReports(): void {
      // Assuming the ReportService has a method to fetch all reports
      this.reportService.getReports().subscribe(reports => {
        console.log("haw report ja:", reports)
        this.reports = reports;
      });
    }
  
    openGenerateReportDialog(): void {
      this.selectedReport = this.initializeReport();
      this.display = true;
    }
  
    openEditReportDialog(report: Report): void {
      this.selectedReport = { ...report };
      this.display = true;
    }
  
    closeDialog(): void {
      this.display = false;
    }
  
    saveReport(): void {
      if (!this.selectedReport.typeRapport || !this.selectedReport.periodeDebut || !this.selectedReport.periodeFin || !this.selectedReport.budget) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields.' });
        return;
      }
  
      if (this.selectedReport.reportId === 0) {
        this.reportService.createReport(this.selectedReport).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report generated successfully.' });
          this.loadReports();
          this.closeDialog();
        });
      } else {
        this.reportService.updateReport(this.selectedReport.reportId, this.selectedReport).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report updated successfully.' });
          this.loadReports();
          this.closeDialog();
        });
      }
    }
  
    deleteReport(reportId: number): void {
      this.reportService.deleteReport(reportId).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report deleted successfully.' });
        this.loadReports();
      });
    }
  }
  