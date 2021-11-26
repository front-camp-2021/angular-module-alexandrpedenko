import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule, BreadcrumbsModule } from '@app/shared';
import { environment } from '@src/environments/environment';
import { reducers } from '@app/store';
import { PersistenceService } from '@app/shared/services/presistence.service';
import { GetFavoritesListFromLocalStorageEffect } from '@app/pages/favorites/store/effects/getFavoritesListFromStorage.effect';
import { GetCartIdListFromLocalStorageEffect } from '@app/pages/cart/store/effects/getCartIdListFromStorage.effect';
import { GetCartAddedProductEffect } from '@app/pages/cart/store/effects/getCartAddedProduct.effect';
import { CartService } from '@app/pages/cart/services/cart.service';
import { GetCartProductsEffect } from '@app/pages/cart/store/effects/getCartProducts.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      GetFavoritesListFromLocalStorageEffect,
      GetCartIdListFromLocalStorageEffect,
      GetCartAddedProductEffect,
      GetCartProductsEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent],
  providers: [PersistenceService, CartService]
})
export class AppModule {}
