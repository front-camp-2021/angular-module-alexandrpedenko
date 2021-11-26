import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '@app/pages/favorites/store/actions/actionTypes';
import { ProductInterface } from '@app/models/backend';

export const getFavoritesProductsAction = createAction(ActionTypes.GET_PRODUCTS);

export const getFavoritesProductsSuccessAction = createAction(
  ActionTypes.GET_PRODUCTS_SUCCESS,
  props<{ products: ProductInterface[] }>()
);

export const getFavoritesProductsErrorAction = createAction(
  ActionTypes.GET_PRODUCTS_ERROR,
  props<{ error: string }>()
);
