import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  getProductsAction,
  getProductsErrorAction,
  getProductsSuccessAction
} from '@app/pages/category/store/actions/getProducts.actions';
import { CategoryService } from '@app/pages/category/services/category.service';

@Injectable()
export class GetProductsEffect {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductsAction),
      switchMap(({ url }) => {
        return this.categoryService.getProducts(url).pipe(
          map((response) => {
            return getProductsSuccessAction({
              products: response.body,
              productsCount: response.headers.get('X-Total-Count')
            });
          }),

          catchError((err) => {
            return of(getProductsErrorAction(err.message));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private categoryService: CategoryService) {}
}
