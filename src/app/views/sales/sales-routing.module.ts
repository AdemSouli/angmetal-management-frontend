import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from './clients/clients.component'
import {QuetosComponent} from './quetos/quetos.component'
import {InvoicesComponent} from './invoices/invoices.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'sales',
    },
    children: [
     
      {
        path: 'clients',
        component: ClientsComponent,
        data: {
          title: 'Clients',
        },
      },
      {
        path: 'quotes-devis',
        component: QuetosComponent,
        data: {
          title: 'Quotes',
        },
      },
      {
        path: 'invoice',
        component: InvoicesComponent,
        data: {
          title: 'Invoices',
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
