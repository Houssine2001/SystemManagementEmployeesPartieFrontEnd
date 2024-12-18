import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import { EmployeeDetailsComponent } from './comp/employee-details/employee-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/ui-component/ui-component.module').then((m) => m.UiComponentModule)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/pages/sample-page/sample-page.component')
      },
      {
        path: 'employee-details/:id',  // Ajouter le chemin pour employee-details avec un paramètre 'id'
        component: EmployeeDetailsComponent
      }
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
