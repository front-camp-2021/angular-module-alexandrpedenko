import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '@app/shared/types/appState.interface';
import { CategoryStateInterface } from '@app/pages/category/types/categoryState.interface';

export const categoryFeatureSelector = createFeatureSelector<CategoryStateInterface>('category');

export const categoryIsLoadingSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: CategoryStateInterface) => categoryState.isLoading
);

export const categoryErrorSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: CategoryStateInterface) => categoryState.error
);

export const categoryProductsSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: CategoryStateInterface) => categoryState.products
);

export const categoryProductsCountSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: CategoryStateInterface) => categoryState.productsCount
);

export const categoryBrandsSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: CategoryStateInterface) => categoryState.brands
);

export const categoryCategoriesSelector = createSelector(
  categoryFeatureSelector,
  (categoryState: CategoryStateInterface) => categoryState.categories
);
