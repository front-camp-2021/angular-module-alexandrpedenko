export enum ActionTypes {
  ADD_TO_CART = '[Cart] Add to cart',
  REMOVE_FROM_CART = '[Cart] Remove from cart',

  INCREMENT_CART_ITEM = '[Cart] Increment cart item',
  DECREMENT_CART_ITEM = '[Cart] Decrement cart item',

  LOAD_CART_PRODUCTS = '[Cart] Load cart products',
  LOAD_CART_PRODUCTS_SUCCESS = '[Cart] Load cart products success',
  LOAD_CART_PRODUCTS_ERROR = '[Cart] Load cart products error',

  LOAD_CART_ADDED_PRODUCT = '[Cart] Load cart added product',
  LOAD_CART_ADDED_PRODUCT_SUCCESS = '[Cart] Load cart added product success',
  LOAD_CART_ADDED_PRODUCT_ERROR = '[Cart] Load cart added product error',

  GET_CART_ID_LIST_FROM_STORAGE = '[Cart] Get cart id list from storage',
  GET_CART_ID_LIST_FROM_STORAGE_SUCCESS = '[Cart] Get cart id list from storage success',
  GET_CART_ID_LIST_FROM_STORAGE_ERROR = '[Cart] Get cart id list from storage error'
}
