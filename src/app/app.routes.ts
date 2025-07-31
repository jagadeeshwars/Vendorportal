import { Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { GuardService } from './auth/guard.service';

export const routes: Routes = [
    {
        path:"auth",loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: BaseComponent,
       canActivate: [GuardService],
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./Pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
          },
        
        ],
      },
];
