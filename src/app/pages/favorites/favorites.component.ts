import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { getFavoritesProductsAction } from '@app/pages/favorites/store/actions/getFavoritesProducts.actions';
import {
  favoritesErrorSelector,
  favoritesIdListSelector,
  favoritesIsLoadingSelector,
  favoritesProductsSelector
} from '@app/pages/favorites/store/selectors';
import { Observable } from 'rxjs';
import { ProductInterface } from '@app/models/backend';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  products$?: Observable<ProductInterface[]>;
  favoritesIdList$?: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.store.dispatch(getFavoritesProductsAction());

    this.isLoading$ = this.store.pipe(select(favoritesIsLoadingSelector));
    this.error$ = this.store.pipe(select(favoritesErrorSelector));
    this.favoritesIdList$ = this.store.pipe(select(favoritesIdListSelector));
    this.products$ = this.store.pipe(select(favoritesProductsSelector));
  }
}
