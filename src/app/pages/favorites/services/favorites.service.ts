import { PersistenceService } from '@app/shared/services/presistence.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'query-string';
import { Observable } from 'rxjs';

import { ProductInterface } from '@app/models/backend';
import { environment } from '@src/environments/environment';

@Injectable()
export class FavoritesService {
  constructor(private http: HttpClient, private persistenceService: PersistenceService) {}

  setFavoritesToLocalStorage(productId: string) {
    let favoritesIdListFromStorage = this.persistenceService.get('favoritesIdList');
    if (favoritesIdListFromStorage) {
      favoritesIdListFromStorage.push(productId);
      this.persistenceService.set('favoritesIdList', favoritesIdListFromStorage);
    } else {
      favoritesIdListFromStorage = [productId];
      this.persistenceService.set('favoritesIdList', favoritesIdListFromStorage);
    }
  }

  removeFavoritesFromLocalStorage(productId: string) {
    let favoritesIdListFromStorage = this.persistenceService.get('favoritesIdList');
    if (favoritesIdListFromStorage && favoritesIdListFromStorage.length > 0) {
      favoritesIdListFromStorage = favoritesIdListFromStorage.filter(
        (listId: string) => listId !== productId
      );
      this.persistenceService.set('favoritesIdList', favoritesIdListFromStorage);
    }
  }

  getFavoritesProducts(favoritesIdList: string[]): Observable<ProductInterface[]> {
    const stringifyUrl = stringify(
      {
        id: favoritesIdList ? favoritesIdList : null
      },
      {
        skipNull: true
      }
    );
    const fullUrl = `${environment.apiUrl}/products?${stringifyUrl}`;

    return this.http.get<ProductInterface[]>(fullUrl);
  }
}
