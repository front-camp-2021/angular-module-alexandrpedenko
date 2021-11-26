import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@app/pages/favorites/store/actions/actionTypes';

export const addToFavoritesAction = createAction(
  ActionTypes.ADD_TO_FAVORITES,
  props<{ productId: string }>()
);

export const removeFromFavoritesAction = createAction(
  ActionTypes.REMOVE_FROM_FAVORITES,
  props<{ productId: string }>()
);

export const getFavoritesListFromStorage = createAction(ActionTypes.GET_FAVORITES_FROM_STORAGE);

export const getFavoritesListFromStorageSuccess = createAction(
  ActionTypes.GET_FAVORITES_FROM_STORAGE_SUCCESS,
  props<{ productIdList: string[] }>()
);

export const getFavoritesListFromStorageError = createAction(
  ActionTypes.GET_FAVORITES_FROM_STORAGE_ERROR
);
