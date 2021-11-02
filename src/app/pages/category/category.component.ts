import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { parseUrl, stringify } from 'query-string';

import { ProductInterface } from '@app/models/backend';
import {
  categoryErrorSelector,
  categoryIsLoadingSelector,
  categoryProductsCountSelector,
  categoryProductsSelector
} from '@app/pages/category/store/selectors';
import { environment } from '@src/environments/environment';
import { getProductsAction } from '@app/pages/category/store/actions/getProducts.actions';
import { getBrandsAction } from '@app/pages/category/store/actions/getBrands.actions';
import { getCategoriesAction } from '@app/pages/category/store/actions/getCategories.actions';
import { favoritesIdListSelector } from '@app/pages/favorites/store/selectors';
import { cartIdListSelector } from '@app/pages/cart/store/selectors';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  productsUrl: string = '/products';
  baseUrl: string = '';
  currentPage: number = 1;
  searchQuery: string | null = null;
  brand: string | null = null;
  category: string | null = null;
  priceMinValue: string | null = null;
  priceMaxValue: string | null = null;
  ratingMinValue: string | null = null;
  ratingMaxValue: string | null = null;
  limit = environment.limit;

  queryParamsSubscription?: Subscription;
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  products$?: Observable<ProductInterface[] | null>;
  productsCount$?: Observable<string | null>;
  favoritesIdList$?: Observable<string[]>;
  cartIdList$?: Observable<string[]>;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  initializeValues(): void {
    this.store.dispatch(getBrandsAction());
    this.store.dispatch(getCategoriesAction());

    this.isLoading$ = this.store.pipe(select(categoryIsLoadingSelector));
    this.error$ = this.store.pipe(select(categoryErrorSelector));
    this.products$ = this.store.pipe(select(categoryProductsSelector));
    this.productsCount$ = this.store.pipe(select(categoryProductsCountSelector));
    this.favoritesIdList$ = this.store.pipe(select(favoritesIdListSelector));
    this.cartIdList$ = this.store.pipe(select(cartIdListSelector));

    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params.page || '1');
      this.searchQuery = params.q || null;
      this.brand = params.brand ? params.brand.split(',') : null;
      this.category = params.category ? params.category.split(',') : null;

      this.priceMinValue = params.price_gte ? params.price_gte : null;
      this.priceMaxValue = params.price_lte ? params.price_lte : null;
      this.ratingMinValue = params.rating_gte ? params.rating_gte : null;
      this.ratingMaxValue = params.rating_lte ? params.rating_lte : null;

      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    const parsedUrl = parseUrl(this.productsUrl);

    const stringifiedParams = stringify(
      {
        _limit: environment.limit,
        _page: this.currentPage,
        brand: this.brand,
        category: this.category,
        q: this.searchQuery,
        price_gte: this.priceMinValue,
        price_lte: this.priceMaxValue,
        rating_gte: this.ratingMinValue,
        rating_lte: this.ratingMaxValue,
        ...parsedUrl.query
      },
      {
        skipNull: true
      }
    );

    const apiUrlWIthParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getProductsAction({ url: apiUrlWIthParams }));
  }

  searchWasChanged(value: string) {
    this.searchQuery = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: value.length > 0 ? value : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
