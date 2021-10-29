import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ButtonModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
];

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ButtonModule],
  providers: [UtilsService]
})
export class CartModule {}
