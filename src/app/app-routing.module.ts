import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then((m) => m.CategoryModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then((m) => m.CartModule)
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./pages/favorites/favorites.module').then((m) => m.FavoritesModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'category'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'category'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
