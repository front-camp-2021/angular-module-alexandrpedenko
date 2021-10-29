import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  loadCartProductsAction,
  loadCartProductsActionError,
  loadCartProductsActionSuccess
} from '../actions/cart.actions';
import { PersistenceService } from '@app/shared/services/presistence.service';
import { CartService } from '../../services/cart.service';

@Injectable()
export class GetCartProductsEffect {
  getCartProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartProductsAction),
      switchMap(() => {
        const cartProductsIdList = this.persistenceService.get('cartIdList');

        if (!cartProductsIdList || cartProductsIdList.length < 1) {
          return of(loadCartProductsActionError({ error: 'No products' }));
        }

        return this.cartService.getCartProducts(cartProductsIdList).pipe(
          map((products) => {
            return loadCartProductsActionSuccess({ products });
          }),

          catchError((err) => {
            return of(loadCartProductsActionError(err.message));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private persistenceService: PersistenceService
  ) {}
}
