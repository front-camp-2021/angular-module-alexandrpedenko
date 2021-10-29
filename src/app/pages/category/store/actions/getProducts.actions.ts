import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '@app/pages/category/store/actions/actionTypes';
import { ProductInterface } from '@app/models/backend';

export const getProductsAction = createAction(ActionTypes.GET_PRODUCTS, props<{ url: string }>());

export const getProductsSuccessAction = createAction(
  ActionTypes.GET_PRODUCTS_SUCCESS,
  props<{ products: ProductInterface[] | null; productsCount: string | null }>()
);

export const getProductsErrorAction = createAction(
  ActionTypes.GET_PRODUCTS_ERROR,
  props<{ error: string }>()
);
