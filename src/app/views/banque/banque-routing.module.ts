import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanqueComponent } from './banque.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'banque',
    },
    children: [
     
      {
        path: 'banques',
        component: BanqueComponent,
        data: {
          title: 'Banques',
        },
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanqueRoutingModule { }
