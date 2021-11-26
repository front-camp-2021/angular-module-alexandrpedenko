import { createReducer, on } from '@ngrx/store';

import { FavoritesStateInterface } from '@app/pages/favorites/types/favoritesState.interface';
import {
  getFavoritesProductsAction,
  getFavoritesProductsErrorAction,
  getFavoritesProductsSuccessAction
} from '@app/pages/favorites/store/actions/getFavoritesProducts.actions';
import {
  addToFavoritesAction,
  getFavoritesListFromStorage,
  getFavoritesListFromStorageError,
  getFavoritesListFromStorageSuccess,
  removeFromFavoritesAction
} from '@app/pages/favorites/store/actions/favorites.actions';

const initialState: FavoritesStateInterface = {
  isLoading: false,
  error: null,
  favoritesProducts: [],
  favoritesIdList: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(
    getFavoritesProductsAction,
    (state): FavoritesStateInterface => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),

  on(
    getFavoritesProductsSuccessAction,
    (state, action): FavoritesStateInterface => ({
      ...state,
      isLoading: false,
      favoritesProducts: action.products
    })
  ),

  on(
    getFavoritesProductsErrorAction,
    (state, action): FavoritesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),

  on(
    addToFavoritesAction,
    (state, action): FavoritesStateInterface => ({
      ...state,
      favoritesIdList: [...state.favoritesIdList, action.productId]
    })
  ),

  on(
    removeFromFavoritesAction,
    (state, action): FavoritesStateInterface => ({
      ...state,
      favoritesIdList: [...state.favoritesIdList.filter((item) => item !== action.productId)],
      favoritesProducts: [...state.favoritesProducts.filter((item) => item.id !== action.productId)]
    })
  ),

  on(
    getFavoritesListFromStorage,
    (state): FavoritesStateInterface => ({
      ...state,
      isLoading: true
    })
  ),

  on(
    getFavoritesListFromStorageSuccess,
    (state, action): FavoritesStateInterface => ({
      ...state,
      isLoading: false,
      favoritesIdList: action.productIdList
    })
  ),

  on(
    getFavoritesListFromStorageError,
    (state): FavoritesStateInterface => ({
      ...state,
      isLoading: false,
      favoritesIdList: []
    })
  )
);
