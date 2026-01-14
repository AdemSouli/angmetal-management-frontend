import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component'
import { BanqueComponent } from '../banque/banque.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'company',
    },
    children: [
     
      {
        path: 'company',
        component: CompaniesComponent,
        data: {
          title: 'Companies',
        },
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
