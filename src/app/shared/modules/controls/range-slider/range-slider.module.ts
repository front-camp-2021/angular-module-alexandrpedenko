import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { RangeSliderComponent } from './range-slider.component';

@NgModule({
  declarations: [RangeSliderComponent],
  imports: [CommonModule, FormsModule, NgxSliderModule],
  exports: [RangeSliderComponent]
})
export class RangeSliderModule {}
