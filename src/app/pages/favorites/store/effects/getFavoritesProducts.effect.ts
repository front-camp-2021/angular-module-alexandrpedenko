import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FavoritesService } from '@app/pages/favorites/services/favorites.service';
import {
  getFavoritesProductsAction,
  getFavoritesProductsErrorAction,
  getFavoritesProductsSuccessAction
} from '@app/pages/favorites/store/actions/getFavoritesProducts.actions';
import { PersistenceService } from '@app/shared/services/presistence.service';

@Injectable()
export class GetFavoritesProductsEffect {
  getFavoritesProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFavoritesProductsAction),
      switchMap(() => {
        const favoritesProductsIdList = this.persistenceService.get('favoritesIdList');

        if (!favoritesProductsIdList || favoritesProductsIdList.length < 1) {
          return of(getFavoritesProductsErrorAction({ error: 'No favorites products' }));
        }

        return this.favoritesService.getFavoritesProducts(favoritesProductsIdList).pipe(
          map((products) => {
            return getFavoritesProductsSuccessAction({ products });
          }),

          catchError((err) => {
            return of(getFavoritesProductsErrorAction(err.message));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService,
    private persistenceService: PersistenceService
  ) {}
}
