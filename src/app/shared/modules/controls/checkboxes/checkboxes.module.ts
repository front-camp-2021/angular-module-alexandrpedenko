import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesComponent } from './checkboxes.component';
import { UtilsService } from '@app/shared/services/utils.service';

@NgModule({
  declarations: [CheckboxesComponent],
  imports: [CommonModule],
  exports: [CheckboxesComponent],
  providers: [UtilsService]
})
export class CheckboxesModule {}
