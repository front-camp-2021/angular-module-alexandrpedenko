export type ButtonType = 'button' | 'submit';

export const icons = {
  chevronLeft: 'assets/images/icons/chevron-left.svg',
  chevronRight: 'assets/images/icons/chevron-right.svg',
  chevronsRight: 'assets/images/icons/chevrons-right.svg',
  shoppingBag: 'assets/images/icons/shopping-bag.svg',
  heartWhite: 'assets/images/icons/heart-white.svg',
  heart: 'assets/images/icons/heart.svg'
};

export enum ButtonIconsEnum {
  CHEVRON_LEFT = 'chevronLeft',
  CHEVRON_RIGHT = 'chevronRight',
  CHEVRONS_RIGHT = 'chevronsRight',
  SHOPPING_BAG = 'shoppingBag',
  HEART_WHITE = 'heartWhite',
  HEART = 'heart'
}

export enum ButtonSizesEnum {
  MEDIUM = 'medium',
  RESPONSIVE = 'responsive',
  ICON = 'icon'
}

export enum ButtonColorsEnum {
  PRIMARY = 'primary',
  WHITE = 'white',
  SECONDARY = 'secondary'
}

export type ButtonIconPropsType =
  | null
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronsRight'
  | 'heart'
  | 'heartWhite'
  | 'shoppingBag';

export type ButtonSizePropsType = 'responsive' | 'medium' | 'icon';
export type ButtonColorPropsType = 'primary' | 'white' | 'secondary';
