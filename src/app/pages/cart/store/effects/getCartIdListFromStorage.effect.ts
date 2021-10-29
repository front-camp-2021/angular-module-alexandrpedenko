import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PersistenceService } from '@app/shared/services/presistence.service';

import {
  getCartIdListFromStorage,
  getCartIdListFromStorageError,
  getCartIdListFromStorageSuccess
} from '@app/pages/cart/store/actions/cart.actions';

@Injectable()
export class GetCartIdListFromLocalStorageEffect {
  getCartIdListFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCartIdListFromStorage),
      switchMap(() => {
        const cartProductsIdList = this.persistenceService.get('cartIdList');

        if (!cartProductsIdList || cartProductsIdList.length < 1) {
          return of(getCartIdListFromStorageError());
        }

        return of(getCartIdListFromStorageSuccess({ productIdList: cartProductsIdList }));
      })
    )
  );

  constructor(private actions$: Actions, private persistenceService: PersistenceService) {}
}
