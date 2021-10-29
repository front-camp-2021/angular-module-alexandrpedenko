import { Action, createReducer, on } from '@ngrx/store';
import { CartStateInterface } from '@app/pages/cart/types/cartState.interface';
import {
  addToCartAction,
  decrementCartItemAction,
  getCartIdListFromStorage,
  getCartIdListFromStorageError,
  getCartIdListFromStorageSuccess,
  incrementCartItemAction,
  loadCartAddedProductAction,
  loadCartAddedProductActionError,
  loadCartAddedProductActionSuccess,
  loadCartProductsAction,
  loadCartProductsActionError,
  loadCartProductsActionSuccess,
  removeFromCartAction
} from '@app/pages/cart/store/actions/cart.actions';

const initialState: CartStateInterface = {
  isLoading: false,
  error: null,
  cartProducts: [],
  cartIdList: []
};

export const cartReducer = createReducer(
  initialState,

  on(
    addToCartAction,
    (state, action): CartStateInterface => ({
      ...state,
      cartIdList: [...state.cartIdList, action.productId]
    })
  ),

  on(
    incrementCartItemAction,
    (state, action): CartStateInterface => ({
      ...state,
      cartProducts: state.cartProducts.map((item) => {
        if (item.id === action.productId) {
          return {
            ...item,
            productCount: item.productCount + 1
          };
        } else {
          return item;
        }
      })
    })
  ),

  on(
    decrementCartItemAction,
    (state, action): CartStateInterface => ({
      ...state,
      cartProducts: state.cartProducts.map((item) => {
        if (item.id === action.productId) {
          return {
            ...item,
            productCount: item.productCount - 1
          };
        } else {
          return item;
        }
      })
    })
  ),

  on(
    removeFromCartAction,
    (state, action): CartStateInterface => ({
      ...state,
      cartIdList: [...state.cartIdList.filter((item) => item !== action.productId)],
      cartProducts: [...state.cartProducts.filter((item) => item.id !== action.productId)]
    })
  ),

  on(
    getCartIdListFromStorage,
    (state): CartStateInterface => ({
      ...state,
      isLoading: true
    })
  ),

  on(
    getCartIdListFromStorageSuccess,
    (state, action): CartStateInterface => ({
      ...state,
      isLoading: false,
      cartIdList: action.productIdList
    })
  ),

  on(
    getCartIdListFromStorageError,
    (state): CartStateInterface => ({
      ...state,
      isLoading: false,
      cartIdList: []
    })
  ),

  on(
    loadCartProductsAction,
    (state): CartStateInterface => ({
      ...state,
      isLoading: true
    })
  ),

  on(
    loadCartProductsActionSuccess,
    (state, action): CartStateInterface => ({
      ...state,
      isLoading: false,
      cartProducts: action.products.map((productItem) => {
        return { ...productItem, productCount: 1 };
      })
    })
  ),

  on(
    loadCartProductsActionError,
    (state, action): CartStateInterface => ({
      ...state,
      isLoading: false,
      cartProducts: [],
      error: action.error
    })
  ),

  on(
    loadCartAddedProductAction,
    (state): CartStateInterface => ({
      ...state,
      isLoading: true
    })
  ),

  on(
    loadCartAddedProductActionSuccess,
    (state, action): CartStateInterface => ({
      ...state,
      isLoading: false,
      cartProducts: [...state.cartProducts, { ...action.products[0], productCount: 1 }]
    })
  ),

  on(
    loadCartAddedProductActionError,
    (state, action): CartStateInterface => ({
      ...state,
      isLoading: false,
      cartProducts: [],
      error: action.error
    })
  )
);
