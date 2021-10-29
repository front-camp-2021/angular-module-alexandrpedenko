import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  loadCartAddedProductAction,
  loadCartAddedProductActionError,
  loadCartAddedProductActionSuccess
} from '../actions/cart.actions';
import { CartService } from '../../services/cart.service';

@Injectable()
export class GetCartAddedProductEffect {
  getCartAddedProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartAddedProductAction),
      switchMap(({ productId }) => {
        return this.cartService.getCartProducts([productId]).pipe(
          map((products) => {
            return loadCartAddedProductActionSuccess({ products });
          }),

          catchError((err) => {
            return of(loadCartAddedProductActionError(err.message));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}
