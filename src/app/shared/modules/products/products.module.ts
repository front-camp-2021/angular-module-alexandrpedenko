import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListModule } from '@app/shared/modules/products/products-list/products-list.module';
import { ProductItemModule } from '@app/shared/modules/products/product-item/product-item.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductsListModule, ProductItemModule],
  exports: [ProductsListModule, ProductItemModule]
})
export class ProductsModule {}
