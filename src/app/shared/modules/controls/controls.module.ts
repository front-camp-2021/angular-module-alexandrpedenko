import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesModule } from '@app/shared/modules/controls/checkboxes/checkboxes.module';
import { RangeSliderModule } from '@app/shared/modules/controls/range-slider/range-slider.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CheckboxesModule, RangeSliderModule],
  exports: [CheckboxesModule, RangeSliderModule]
})
export class ControlsModule {}
