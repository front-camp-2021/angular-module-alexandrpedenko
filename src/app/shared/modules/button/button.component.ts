import { Component, OnInit, Input } from '@angular/core';
import {
  icons,
  ButtonType,
  ButtonIconPropsType,
  ButtonColorPropsType,
  ButtonSizePropsType,
  ButtonColorsEnum,
  ButtonIconsEnum,
  ButtonSizesEnum
} from '@app/shared/modules/button/button.types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: ButtonType = 'button';
  @Input() icon: ButtonIconPropsType = null;
  @Input() size: ButtonSizePropsType = 'medium';
  @Input() color: ButtonColorPropsType = 'primary';
  @Input() classes: string = '';

  iconUrl: string | null = null;
  colorCssClasses: string = 'primary';
  sizeCssClasses: string = 'button_medium';

  constructor() {}

  ngOnInit(): void {
    this.setCssClasses();
    this.checkIconAndSetUrl();
  }

  private setCssClasses() {
    switch (this.size) {
      case ButtonSizesEnum.RESPONSIVE: {
        this.sizeCssClasses = 'button_responsive';
        break;
      }

      case ButtonSizesEnum.MEDIUM: {
        this.sizeCssClasses = 'button_medium';
        break;
      }

      case ButtonSizesEnum.ICON: {
        this.sizeCssClasses = 'button_icon';
        break;
      }

      default: {
        this.sizeCssClasses = 'button_medium';
        break;
      }
    }

    switch (this.color) {
      case ButtonColorsEnum.PRIMARY: {
        this.colorCssClasses = 'button_primary';
        break;
      }

      case ButtonColorsEnum.SECONDARY: {
        this.colorCssClasses = 'button_secondary';
        break;
      }

      case ButtonColorsEnum.WHITE: {
        this.colorCssClasses = 'button_white';
        break;
      }

      default: {
        this.colorCssClasses = 'button_primary';
        break;
      }
    }
  }

  private checkIconAndSetUrl() {
    switch (this.icon) {
      case ButtonIconsEnum.CHEVRON_LEFT: {
        this.iconUrl = icons.chevronLeft;
        return;
      }

      case ButtonIconsEnum.CHEVRON_RIGHT: {
        this.iconUrl = icons.chevronLeft;
        return;
      }

      case ButtonIconsEnum.CHEVRONS_RIGHT: {
        this.iconUrl = icons.chevronsRight;
        return;
      }

      case ButtonIconsEnum.HEART: {
        this.iconUrl = icons.heart;
        return;
      }

      case ButtonIconsEnum.HEART_WHITE: {
        this.iconUrl = icons.heartWhite;
        return;
      }

      case ButtonIconsEnum.SHOPPING_BAG: {
        this.iconUrl = icons.shoppingBag;
        return;
      }

      default: {
        this.iconUrl = null;
        return;
      }
    }
  }
}
