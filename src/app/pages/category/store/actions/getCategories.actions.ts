import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '@app/pages/category/store/actions/actionTypes';
import { CategoryType } from '@app/models/backend';

export const getCategoriesAction = createAction(ActionTypes.GET_CATEGORIES);

export const getCategoriesSuccessAction = createAction(
  ActionTypes.GET_CATEGORIES_SUCCESS,
  props<{ categories: CategoryType[] }>()
);

export const getCategoriesErrorAction = createAction(
  ActionTypes.GET_CATEGORIES_ERROR,
  props<{ error: string }>()
);
