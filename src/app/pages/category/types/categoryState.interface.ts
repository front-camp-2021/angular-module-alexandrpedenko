import { BrandType, CategoryType, ProductInterface } from '@app/models/backend';

export interface CategoryStateInterface {
  isLoading: boolean;
  error: string | null;
  products: ProductInterface[] | null;
  productsCount: string | null;
  brands: BrandType[];
  categories: CategoryType[];
}
