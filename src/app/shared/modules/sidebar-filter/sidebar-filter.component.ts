import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {
  categoryBrandsSelector,
  categoryCategoriesSelector
} from '@app/pages/category/store/selectors';
import { ControlItem } from '@app/models/frontend/control-item';
import { BrandType, CategoryType } from '@app/models/backend';
import { UtilsService } from '@app/shared/services/utils.service';
import { RangeSliderResponse } from '@app/shared/modules/controls/range-slider/range-slider.component';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  brands: ControlItem[] = [];
  brandsChecked: string[] = [];
  categoriesChecked: string[] = [];
  priceRangeMinSelected: number = 0;
  priceRangeMaxSelected: number = 85000;
  ratingRangeMinSelected: number = 0;
  ratingRangeMaxSelected: number = 5;

  queryParamsSubscription?: Subscription;
  brands$?: Observable<BrandType[]>;
  categories$?: Observable<CategoryType[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
    this.form = this.fb.group({
      brand: [
        null,
        {
          updateOn: 'change'
        }
      ],
      category: [
        null,
        {
          updateOn: 'change'
        }
      ]
    });
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  initializeValues(): void {
    this.brands$ = this.store.pipe(select(categoryBrandsSelector));
    this.categories$ = this.store.pipe(select(categoryCategoriesSelector));

    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.brandsChecked = params.brand ? params.brand.split(',') : null;
      this.categoriesChecked = params.category ? params.category.split(',') : null;
      this.priceRangeMinSelected = params.price_gte ? parseInt(params.price_gte) : 0;
      this.priceRangeMaxSelected = params.price_lte ? parseInt(params.price_lte) : 85000;
      this.ratingRangeMinSelected = params.rating_gte ? parseFloat(params.rating_gte) : 0;
      this.ratingRangeMaxSelected = params.rating_lte ? parseFloat(params.rating_lte) : 5;
    });
  }

  controlWasChanged(): void {
    let brand = this.utilsService.setFilterParameter(this.form.value.brand, this.brandsChecked);
    let category = this.utilsService.setFilterParameter(
      this.form.value.category,
      this.categoriesChecked
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: brand,
        category: category,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  priceSliderWasChanged(value: RangeSliderResponse) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price_gte: value.min ? value.min : null,
        price_lte: value.max ? value.max : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  ratingSliderWasChanged(value: RangeSliderResponse) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        rating_gte: value.min ? value.min : null,
        rating_lte: value.max ? value.max : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  resetAllFilters() {
    this.router.navigate(['/'], {
      relativeTo: this.route
    });
  }
}
