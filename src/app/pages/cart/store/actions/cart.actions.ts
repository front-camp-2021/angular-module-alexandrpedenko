import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@app/pages/cart/store/actions/actionTypes';
import { ProductInterface } from '@app/models/backend';

export const addToCartAction = createAction(
  ActionTypes.ADD_TO_CART,
  props<{ productId: string }>()
);

export const incrementCartItemAction = createAction(
  ActionTypes.INCREMENT_CART_ITEM,
  props<{ productId: string }>()
);

export const decrementCartItemAction = createAction(
  ActionTypes.DECREMENT_CART_ITEM,
  props<{ productId: string }>()
);

export const removeFromCartAction = createAction(
  ActionTypes.REMOVE_FROM_CART,
  props<{ productId: string }>()
);

export const loadCartProductsAction = createAction(ActionTypes.LOAD_CART_PRODUCTS);

export const loadCartProductsActionSuccess = createAction(
  ActionTypes.LOAD_CART_PRODUCTS_SUCCESS,
  props<{ products: ProductInterface[] }>()
);

export const loadCartProductsActionError = createAction(
  ActionTypes.LOAD_CART_PRODUCTS_ERROR,
  props<{ error: string }>()
);

export const loadCartAddedProductAction = createAction(
  ActionTypes.LOAD_CART_ADDED_PRODUCT,
  props<{ productId: string }>()
);

export const loadCartAddedProductActionSuccess = createAction(
  ActionTypes.LOAD_CART_ADDED_PRODUCT_SUCCESS,
  props<{ products: ProductInterface[] }>()
);

export const loadCartAddedProductActionError = createAction(
  ActionTypes.LOAD_CART_ADDED_PRODUCT_ERROR,
  props<{ error: string }>()
);

export const getCartIdListFromStorage = createAction(ActionTypes.GET_CART_ID_LIST_FROM_STORAGE);

export const getCartIdListFromStorageSuccess = createAction(
  ActionTypes.GET_CART_ID_LIST_FROM_STORAGE_SUCCESS,
  props<{ productIdList: string[] }>()
);

export const getCartIdListFromStorageError = createAction(
  ActionTypes.GET_CART_ID_LIST_FROM_STORAGE_ERROR
);
