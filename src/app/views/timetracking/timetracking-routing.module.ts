import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsComponent} from './projects/projects.component';
import {TimesheetComponent} from './timesheet/timesheet.component';
import {ReportsComponent} from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'sales',
    },
    children: [
     
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          title: 'Projects',
        },
      },
      {
        path: 'timesheets',
        component: TimesheetComponent,
        data: {
          title: 'Timesheets',
        },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Reports',
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetrackingRoutingModule { }
