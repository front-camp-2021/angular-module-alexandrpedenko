import { CategoryType } from '@app/models/backend/category';
import { BrandType } from '@app/models/backend/brand';

export interface ProductInterface {
  id: string;
  images: string[];
  title: string;
  rating: number;
  price: number;
  category: CategoryType;
  brand: BrandType;
}
