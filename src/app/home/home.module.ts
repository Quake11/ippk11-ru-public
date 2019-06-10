import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeRoutes } from './home.routes';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { CoursesModule } from '../courses/courses.module';
import { RequestModule } from '../request/request.module';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
import { ContactsModule } from '../contacts/contacts.module';
import { FeaturesModule } from '../features/features.module';
import { AdvantagesModule } from '../advantages/advantages.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutes,
    AngularFirestoreModule,
    MatButtonModule,
    CoursesModule,
    RequestModule,
    ParallaxScrollModule,
    ContactsModule,
    FeaturesModule,
    AdvantagesModule,
  ],
  exports: [HomeComponent],
  providers: [AuthService, UsersService],
})
export class HomeModule {}
