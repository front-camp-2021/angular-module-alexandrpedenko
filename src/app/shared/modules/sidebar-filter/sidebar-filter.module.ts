import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarFilterComponent } from './sidebar-filter.component';
import { ButtonModule } from '@app/shared';
import { ControlsModule } from '../controls';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '@app/shared/services/utils.service';

@NgModule({
  declarations: [SidebarFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ControlsModule],
  exports: [SidebarFilterComponent],
  providers: [UtilsService]
})
export class SidebarFilterModule {}
