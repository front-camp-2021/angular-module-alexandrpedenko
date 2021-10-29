import { Action, createReducer, on } from '@ngrx/store';

import { CategoryStateInterface } from '@app/pages/category/types/categoryState.interface';
import {
  getProductsAction,
  getProductsErrorAction,
  getProductsSuccessAction
} from '@app/pages/category/store/actions/getProducts.actions';
import {
  getBrandsAction,
  getBrandsErrorAction,
  getBrandsSuccessAction
} from '@app/pages/category/store/actions/getBrands.actions';
import {
  getCategoriesAction,
  getCategoriesErrorAction,
  getCategoriesSuccessAction
} from '@app/pages/category/store/actions/getCategories.actions';

const initialState: CategoryStateInterface = {
  isLoading: false,
  error: null,
  products: [],
  productsCount: '0',
  brands: [],
  categories: []
};

export const categoryReducer = createReducer(
  initialState,
  on(
    getProductsAction,
    (state): CategoryStateInterface => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),

  on(
    getProductsSuccessAction,
    (state, action): CategoryStateInterface => ({
      ...state,
      isLoading: false,
      products: action.products,
      productsCount: action.productsCount
    })
  ),

  on(
    getProductsErrorAction,
    (state, action): CategoryStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),

  on(
    getBrandsAction,
    (state): CategoryStateInterface => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),

  on(
    getBrandsSuccessAction,
    (state, action): CategoryStateInterface => ({
      ...state,
      isLoading: false,
      brands: action.brands
    })
  ),

  on(
    getBrandsErrorAction,
    (state, action): CategoryStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),

  on(
    getCategoriesAction,
    (state): CategoryStateInterface => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),

  on(
    getCategoriesSuccessAction,
    (state, action): CategoryStateInterface => ({
      ...state,
      isLoading: false,
      categories: action.categories
    })
  ),

  on(
    getCategoriesErrorAction,
    (state, action): CategoryStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  )
);
