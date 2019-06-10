import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { HoldableDeleteModule } from '../shared/holdable-delete/holdable-delete.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DirectivesModule } from '../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [UploaderComponent, UploadTaskComponent, ProgressBarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    HoldableDeleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    AngularFireStorageModule,
    DirectivesModule,
    MatButtonModule,
    MatTooltipModule,
    PipesModule,
  ],
  exports: [UploaderComponent, UploadTaskComponent, ProgressBarComponent],
})
export class UploaderModule {}
