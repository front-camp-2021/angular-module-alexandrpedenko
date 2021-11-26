import { ProductInterface } from '@app/models/backend';

export interface FavoritesStateInterface {
  isLoading: boolean;
  error: string | null;
  favoritesProducts: ProductInterface[];
  favoritesIdList: string[];
}
