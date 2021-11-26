import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '@app/pages/category/store/actions/actionTypes';
import { BrandType } from '@app/models/backend';

export const getBrandsAction = createAction(ActionTypes.GET_BRANDS);

export const getBrandsSuccessAction = createAction(
  ActionTypes.GET_BRANDS_SUCCESS,
  props<{ brands: BrandType[] }>()
);

export const getBrandsErrorAction = createAction(
  ActionTypes.GET_BRANDS_ERROR,
  props<{ error: string }>()
);
