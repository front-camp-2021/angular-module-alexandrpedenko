import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ControlItem, Value } from '@app/models/frontend';
import { BrandType, CategoryType } from '@app/models/backend';
import { UtilsService } from '@app/shared/services/utils.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private destroy = new Subject<any>();

  @Input('itemsObservable') totalObservableProps?: Observable<BrandType[] | CategoryType[] | null>;
  @Input() checkedItems: BrandType[] | CategoryType[] | null = [];
  @Output() changed = new EventEmitter<Value[]>();

  queryParamsSubscription?: Subscription;
  checkboxItems: ControlItem[] = [];
  value: Value[] | null = [];
  isDisabled: boolean = false;

  constructor(
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.totalObservableProps?.subscribe((val) => {
      if (val !== null) {
        this.value = this.checkedItems;
        this.checkboxItems = this.utilsService.prepareFilters(val);
      }
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      if (params && Object.keys(params).length === 0) {
        this.value = [];
      }
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
    this.destroy.next();
    this.destroy.complete();
  }

  private propagateChange: any = () => {};

  writeValue(value: Value[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value, checkedEvent: any): void {
    if (checkedEvent.target.checked !== null) {
      const selected = this.getSelected(value, checkedEvent.target.checked);
      this.value = selected;
      this.propagateChange(selected);
      this.changed.emit(selected);
    }
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];

    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }

    return selected.length ? selected : [];
  }

  isChecked(value: Value): boolean {
    return this.value ? this.value.includes(value) : false;
  }
}
