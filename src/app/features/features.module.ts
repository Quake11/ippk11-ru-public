import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [CommonModule, PipesModule],
  exports: [FeaturesComponent]
})
export class FeaturesModule {}
