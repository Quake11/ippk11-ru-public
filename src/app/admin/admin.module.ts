import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routes';
import { LoginModule } from '../login/login.module';
import { RequestsListModule } from './requests-list/requests-list.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutes, LoginModule, RequestsListModule],
})
export class AdminModule {}
