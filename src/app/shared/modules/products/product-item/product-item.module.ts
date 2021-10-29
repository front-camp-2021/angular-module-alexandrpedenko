import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { ButtonModule } from '@app/shared';
import { FavoritesService } from '@app/pages/favorites/services/favorites.service';
import { CartService } from '@app/pages/cart/services/cart.service';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [CommonModule, ButtonModule, ButtonModule],
  exports: [ProductItemComponent],
  providers: [FavoritesService, CartService]
})
export class ProductItemModule {}
