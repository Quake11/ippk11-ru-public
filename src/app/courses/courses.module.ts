import { CoursesService } from './../services/courses.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent, CourseTypeFilterPipe } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { MatCardModule } from '@angular/material/card';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RequestModule } from '../request/request.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestComponent } from '../request/request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UploaderModule } from '../uploader/uploader.module';
import { PipesModule } from '../pipes/pipes.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HoldableDeleteModule } from '../shared/holdable-delete/holdable-delete.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, CourseTypeFilterPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    AngularFirestoreModule,
    RequestModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    UploaderModule,
    PipesModule,
    MatSelectModule,
    MatCheckboxModule,
    HoldableDeleteModule,
    MatTooltipModule,
    TextFieldModule,
    DragDropModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatButtonToggleModule,
  ],
  exports: [CoursesComponent, CourseCardComponent],
  providers: [AuthService, CoursesService],
  entryComponents: [RequestComponent],
})
export class CoursesModule {}
