import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CategoryComponent } from './category.component';
import { ButtonModule, SidebarFilterModule } from '@app/shared';
import { ProductsListModule } from '@app/shared/modules/products';
import { SearchModule } from '@app/shared/modules/search/search.module';
import { CategoryService } from '@app/pages/category/services/category.service';
import { PaginationModule } from '@app/shared/modules/pagination/pagination.module';
import { GetProductsEffect } from '@app/pages/category/store/effects/getProducts.effect';
import { GetBrandsEffects } from '@app/pages/category/store/effects/getBrands.effects';
import { GetCategoriesEffect } from '@app/pages/category/store/effects/getCategories.effect';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  }
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetProductsEffect, GetBrandsEffects, GetCategoriesEffect]),
    ButtonModule,
    SidebarFilterModule,
    ProductsListModule,
    SearchModule,
    PaginationModule
  ],
  providers: [CategoryService]
})
export class CategoryModule {}
