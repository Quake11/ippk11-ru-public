import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const AppRoutes = RouterModule.forRoot(routes, {
  initialNavigation: 'enabled'
});
