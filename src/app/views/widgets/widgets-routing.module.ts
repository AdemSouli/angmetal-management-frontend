import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsDropdownComponent,
    data: {
      title: 'Widgets',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetsRoutingModule {}
