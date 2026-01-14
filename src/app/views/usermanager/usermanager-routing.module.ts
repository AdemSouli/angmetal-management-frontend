import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermanagerComponent } from './usermanager/usermanager.component'
const routes: Routes = [ {
  path: '',
  data: {
    title: 'User Manager',
  },
  children: [
   
    {
      path: 'usermanager',
      component: UsermanagerComponent,
      data: {
        title: 'User Manager',
      },
    },

    
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermanagerRoutingModule { }
