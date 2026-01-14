import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './auth/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirect to login first
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  }, 
  
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
     //  canActivate: [AuthGuard],
      },
      {
        path: 'banque',
        loadChildren: () =>
          import('./views/banque/banque.module').then((m) => m.BanqueModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./views/company/company.module').then((m) => m.CompanyModule),
      },

      {
        path: 'product',
        loadChildren: () =>
          import('./views/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./views/company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'purchase',
        loadChildren: () =>
          import('./views/purchase/purshase.module').then((m) => m.PurshaseModule),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./views/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'time-tracking',
        loadChildren: () =>
          import('./views/timetracking/timetracking.module').then((m) => m.TimetrackingModule),
      },
      {
        path: 'time-tracking',
        loadChildren: () =>
          import('./views/timetracking/timetracking.module').then((m) => m.TimetrackingModule),
      },
      {
        path: 'usermanager',
        loadChildren: () =>
          import('./views/usermanager/usermanager.module').then((m) => m.UsermanagerModule),
      },
     
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
