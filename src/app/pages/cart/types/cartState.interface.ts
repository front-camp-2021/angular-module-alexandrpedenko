import { ProductInterface } from '@app/models/backend';

export interface CartProductInterface extends ProductInterface {
  productCount: number;
}

export interface CartStateInterface {
  isLoading: boolean;
  error: string | null;
  cartProducts: CartProductInterface[];
  cartIdList: string[];
}
