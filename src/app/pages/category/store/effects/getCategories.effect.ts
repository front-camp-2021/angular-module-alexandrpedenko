import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CategoryService } from '@app/pages/category/services/category.service';
import {
  getCategoriesAction,
  getCategoriesErrorAction,
  getCategoriesSuccessAction
} from '@app/pages/category/store/actions/getCategories.actions';

@Injectable()
export class GetCategoriesEffect {
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesAction),
      switchMap(() => {
        return this.categoryService.getCategories().pipe(
          map((categories) => {
            return getCategoriesSuccessAction({ categories });
          }),

          catchError((err) => {
            return of(getCategoriesErrorAction(err.message));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private categoryService: CategoryService) {}
}
