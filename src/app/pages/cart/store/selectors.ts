import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartStateInterface } from '@app/pages/cart/types/cartState.interface';

export const cartFeatureSelector = createFeatureSelector<CartStateInterface>('cart');

export const cartIsLoadingSelector = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInterface) => cartState.isLoading
);

export const cartErrorSelector = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInterface) => cartState.error
);

export const cartProductsSelector = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInterface) => cartState.cartProducts
);

export const cartIdListSelector = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInterface) => cartState.cartIdList
);
