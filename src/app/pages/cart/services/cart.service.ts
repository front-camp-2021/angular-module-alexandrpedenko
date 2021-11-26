import { PersistenceService } from '@app/shared/services/presistence.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'query-string';
import { Observable } from 'rxjs';

import { ProductInterface } from '@app/models/backend';
import { environment } from '@src/environments/environment';

@Injectable()
export class CartService {
  constructor(private http: HttpClient, private persistenceService: PersistenceService) {}

  setCartIdItemToLocalStorage(productId: string) {
    let favoritesIdListFromStorage = this.persistenceService.get('cartIdList');
    if (favoritesIdListFromStorage) {
      favoritesIdListFromStorage.push(productId);
      this.persistenceService.set('cartIdList', favoritesIdListFromStorage);
    } else {
      favoritesIdListFromStorage = [productId];
      this.persistenceService.set('cartIdList', favoritesIdListFromStorage);
    }
  }

  removeCartIdItemFromLocalStorage(productId: string) {
    let favoritesIdListFromStorage = this.persistenceService.get('cartIdList');
    if (favoritesIdListFromStorage && favoritesIdListFromStorage.length > 0) {
      favoritesIdListFromStorage = favoritesIdListFromStorage.filter(
        (listId: string) => listId !== productId
      );
      this.persistenceService.set('cartIdList', favoritesIdListFromStorage);
    }
  }

  getCartProducts(cartIdList: string[]): Observable<ProductInterface[]> {
    const stringifyUrl = stringify(
      {
        id: cartIdList && cartIdList.length > 0 ? cartIdList : null
      },
      {
        skipNull: true
      }
    );
    const fullUrl = `${environment.apiUrl}/products?${stringifyUrl}`;

    return this.http.get<ProductInterface[]>(fullUrl);
  }
}
