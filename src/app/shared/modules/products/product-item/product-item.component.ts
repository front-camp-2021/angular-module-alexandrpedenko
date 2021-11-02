import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { ProductInterface } from '@app/models/backend';
import {
  addToFavoritesAction,
  removeFromFavoritesAction
} from '@app/pages/favorites/store/actions/favorites.actions';
import { favoritesIdListSelector } from '@app/pages/favorites/store/selectors';
import { FavoritesService } from '@app/pages/favorites/services/favorites.service';
import {
  addToCartAction,
  incrementCartItemAction,
  loadCartAddedProductAction
} from '@app/pages/cart/store/actions/cart.actions';
import { CartService } from '@app/pages/cart/services/cart.service';
import { cartIdListSelector } from '@app/pages/cart/store/selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private destroy = new Subject<any>();

  @Input() product: ProductInterface = {
    id: '',
    images: [],
    title: '',
    rating: 0,
    price: 0,
    category: '',
    brand: ''
  };

  favoritesIdList$?: Observable<string[]>;
  cartIdList$?: Observable<string[]>;
  cartIdList: string[] = [];

  constructor(
    private store: Store,
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.favoritesIdList$ = this.store.pipe(select(favoritesIdListSelector));
    this.cartIdList$ = this.store.pipe(select(cartIdListSelector));

    this.cartIdList$.pipe(takeUntil(this.destroy)).subscribe((idList) => {
      if (idList !== null) {
        this.cartIdList = idList;
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  addToCart(productId: string) {
    if (this.cartIdList.includes(productId)) {
      this.store.dispatch(incrementCartItemAction({ productId }));
    } else {
      this.store.dispatch(addToCartAction({ productId }));
      this.cartService.setCartIdItemToLocalStorage(productId);
      this.store.dispatch(loadCartAddedProductAction({ productId }));
    }
  }

  addToFavorites(productId: string) {
    this.store.dispatch(addToFavoritesAction({ productId }));
    this.favoritesService.setFavoritesToLocalStorage(productId);
  }

  removeFromFavorites(productId: string) {
    this.store.dispatch(removeFromFavoritesAction({ productId }));
    this.favoritesService.removeFavoritesFromLocalStorage(productId);
  }
}
