import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PersistenceService } from '@app/shared/services/presistence.service';

import {
  getFavoritesListFromStorage,
  getFavoritesListFromStorageError,
  getFavoritesListFromStorageSuccess
} from '@app/pages/favorites/store/actions/favorites.actions';

@Injectable()
export class GetFavoritesListFromLocalStorageEffect {
  getFavoritesListFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFavoritesListFromStorage),
      switchMap(() => {
        const favoritesProductsIdList = this.persistenceService.get('favoritesIdList');

        if (!favoritesProductsIdList || favoritesProductsIdList.length < 1) {
          return of(getFavoritesListFromStorageError());
        } else {
          return of(getFavoritesListFromStorageSuccess({ productIdList: favoritesProductsIdList }));
        }
      })
    )
  );

  constructor(private actions$: Actions, private persistenceService: PersistenceService) {}
}
