import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options, LabelType, ChangeContext, PointerType } from '@angular-slider/ngx-slider';

export interface RangeSliderResponse {
  min: number;
  max: number | undefined;
}

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {
  @Input() currMinValue: number = 0;
  @Input() currMaxValue: number = 100;
  @Input() sliderMinValue: number = 0;
  @Input() sliderMaxValue: number = 100;
  @Input() sliderStep: number = 1;

  @Output() changed = new EventEmitter<RangeSliderResponse>();

  options: Options = {
    floor: this.sliderMinValue,
    ceil: this.sliderMaxValue,
    step: this.sliderStep,
    noSwitching: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `${value}`;
        case LabelType.High:
          return `${value}`;
        default:
          return `${value}`;
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.options = {
      floor: this.sliderMinValue,
      ceil: this.sliderMaxValue,
      step: this.sliderStep,
      noSwitching: true,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `${value}`;
          case LabelType.High:
            return `${value}`;
          default:
            return `${value}`;
        }
      }
    };
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.changed.emit({ min: changeContext.value, max: changeContext.highValue });
  }
}
