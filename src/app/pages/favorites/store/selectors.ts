import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesStateInterface } from '@app/pages/favorites/types/favoritesState.interface';

export const favoritesFeatureSelector = createFeatureSelector<FavoritesStateInterface>('favorites');

export const favoritesIsLoadingSelector = createSelector(
  favoritesFeatureSelector,
  (favoritesState: FavoritesStateInterface) => favoritesState.isLoading
);

export const favoritesErrorSelector = createSelector(
  favoritesFeatureSelector,
  (favoritesState: FavoritesStateInterface) => favoritesState.error
);

export const favoritesProductsSelector = createSelector(
  favoritesFeatureSelector,
  (favoritesState: FavoritesStateInterface) => favoritesState.favoritesProducts
);

export const favoritesIdListSelector = createSelector(
  favoritesFeatureSelector,
  (favoritesState: FavoritesStateInterface) => favoritesState.favoritesIdList
);
