import { ActionReducerMap } from '@ngrx/store';
import { AppStateInterface } from '@app/shared/types/appState.interface';

import { favoritesReducer } from '@app/pages/favorites/store/reducers';
import { categoryReducer } from '@app/pages/category/store/reducers';
import { cartReducer } from '@app/pages/cart/store/reducers';

export const reducers: ActionReducerMap<AppStateInterface> = {
  category: categoryReducer,
  favorites: favoritesReducer,
  cart: cartReducer
};
