import { CategoryStateInterface } from '@app/pages/category/types/categoryState.interface';
import { FavoritesStateInterface } from '@app/pages/favorites/types/favoritesState.interface';
import { CartStateInterface } from '@app/pages/cart/types/cartState.interface';

export interface AppStateInterface {
  category: CategoryStateInterface;
  favorites: FavoritesStateInterface;
  cart: CartStateInterface;
}
