import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { getFavoritesListFromStorage } from '@app/pages/favorites/store/actions/favorites.actions';
import {
  getCartIdListFromStorage,
  loadCartProductsAction
} from '@app/pages/cart/store/actions/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(getFavoritesListFromStorage());
    this.store.dispatch(getCartIdListFromStorage());

    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.store.dispatch(loadCartProductsAction());
        }
      });
  }
}
