import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldableDeleteComponent } from './holdable-delete.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [HoldableDeleteComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    DirectivesModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [HoldableDeleteComponent],
})
export class HoldableDeleteModule {}
