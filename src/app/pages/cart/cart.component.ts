import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { ProductInterface } from '@app/models/backend';
import {
  cartErrorSelector,
  cartIsLoadingSelector,
  cartProductsSelector
} from '@app/pages/cart/store/selectors';
import { UtilsService } from '@app/shared/services/utils.service';
import { CartProductInterface } from '@app/pages/cart/types/cartState.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  cartProducts$?: Observable<CartProductInterface[]>;
  cartProducts: CartProductInterface[] = [];

  cartTotal: number = 0;

  constructor(private store: Store, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(cartIsLoadingSelector));
    this.error$ = this.store.pipe(select(cartErrorSelector));
    this.cartProducts$ = this.store.pipe(select(cartProductsSelector));

    this.cartProducts$.subscribe((productsList) => {
      if (productsList !== null) {
        this.cartTotal = this.utilsService.calcTotalPrice(productsList);
        this.cartProducts = productsList;
      }
    });
  }
}
