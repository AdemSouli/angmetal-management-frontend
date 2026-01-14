import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors/vendors.component';
import { BillsComponent } from './bills/bills.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'purshase',
    },
    children: [
     
      {
        path: 'vendors',
        component: VendorsComponent,
        data: {
          title: 'Vendors',
        },
      },
      {
        path: 'bills',
        component: BillsComponent,
        data: {
          title: 'Bills',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurshaseRoutingModule { }
