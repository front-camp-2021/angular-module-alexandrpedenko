import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CartProductInterface } from '@app/pages/cart/types/cartState.interface';
import {
  decrementCartItemAction,
  incrementCartItemAction,
  removeFromCartAction
} from '@app/pages/cart/store/actions/cart.actions';
import { CartService } from '@app/pages/cart/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartProduct?: CartProductInterface;
  cartProductTotalPrice: number = 0;

  constructor(private store: Store, private cartService: CartService) {}

  ngOnInit(): void {
    if (this.cartProduct) {
      this.cartProductTotalPrice = this.cartProduct.productCount * this.cartProduct.price;
    }
  }

  incrementCartProduct(productId: string) {
    this.store.dispatch(incrementCartItemAction({ productId }));
  }

  decrementCartProduct(productId: string) {
    if (this.cartProduct && this.cartProduct.productCount >= 2) {
      this.store.dispatch(decrementCartItemAction({ productId }));
    }
  }

  deleteCartProduct(productId: string) {
    this.store.dispatch(removeFromCartAction({ productId }));
    this.cartService.removeCartIdItemFromLocalStorage(productId);
  }
}
