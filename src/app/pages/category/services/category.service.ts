import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@src/environments/environment';
import { BrandType, CategoryType, ProductInterface } from '@app/models/backend';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getProducts(url: string): Observable<HttpResponse<ProductInterface[]>> {
    const fullUrl = environment.apiUrl + url;

    return this.http.get<ProductInterface[]>(fullUrl, { observe: 'response' });
  }

  getBrands(): Observable<BrandType[]> {
    const fullUrl = environment.apiUrl + '/brands';

    return this.http.get<BrandType[]>(fullUrl);
  }

  getCategories(): Observable<CategoryType[]> {
    const fullUrl = environment.apiUrl + '/categories';

    return this.http.get<CategoryType[]>(fullUrl);
  }
}
