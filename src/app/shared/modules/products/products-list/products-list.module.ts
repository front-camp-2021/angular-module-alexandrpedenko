import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { ProductItemModule } from '@app/shared/modules/products/product-item/product-item.module';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, ProductItemModule],
  exports: [ProductsListComponent]
})
export class ProductsListModule {}
