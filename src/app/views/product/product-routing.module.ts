import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'product',
    },
    children: [
     
      {
        path: 'items',
        component: ItemsComponent,
        data: {
          title: 'Products',
        },
      },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
