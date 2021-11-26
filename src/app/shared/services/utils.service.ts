import { Injectable } from '@angular/core';
import { BrandType, CategoryType } from '@app/models/backend';
import { ControlItem } from '@app/models/frontend';
import { CartProductInterface } from '@app/pages/cart/types/cartState.interface';

@Injectable()
export class UtilsService {
  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  prepareFilters = (arr: BrandType[] | CategoryType[]): ControlItem[] => {
    return arr.map((item) => {
      return {
        value: item.toLowerCase().split(' ').join('_'),
        label: item
      };
    });
  };

  setFilterParameter = (formStateValue: string[], checkedState: string[]) => {
    if (formStateValue?.length > 0) {
      return formStateValue.join(',');
    } else if (formStateValue === null && checkedState !== null) {
      return checkedState.join(',');
    } else {
      return null;
    }
  };

  calcTotalPrice = (cartProducts: CartProductInterface[]) => {
    return cartProducts.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.price * currentValue.productCount;
    }, 0);
  };
}
