import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { ProductsListModule } from '@app/shared/modules/products';
import { FavoritesService } from '@app/pages/favorites/services/favorites.service';
import { GetFavoritesProductsEffect } from '@app/pages/favorites/store/effects/getFavoritesProducts.effect';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent
  }
];

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetFavoritesProductsEffect]),
    ProductsListModule
  ],
  providers: [FavoritesService]
})
export class FavoritesModule {}
