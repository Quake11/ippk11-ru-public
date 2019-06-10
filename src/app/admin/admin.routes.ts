import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      meta: {
        title: 'Панель администратора',
        description: 'Панель администратора',
        override: true,
      },
    },
  },
];

export const AdminRoutes = RouterModule.forChild(routes);
