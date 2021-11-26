import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CategoryService } from '@app/pages/category/services/category.service';
import {
  getBrandsAction,
  getBrandsErrorAction,
  getBrandsSuccessAction
} from '@app/pages/category/store/actions/getBrands.actions';

@Injectable()
export class GetBrandsEffects {
  getBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBrandsAction),
      switchMap(() => {
        return this.categoryService.getBrands().pipe(
          map((brands) => {
            return getBrandsSuccessAction({ brands });
          }),

          catchError((err) => {
            return of(getBrandsErrorAction(err.message));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private categoryService: CategoryService) {}
}
