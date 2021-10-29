import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private subject: Subject<string> = new Subject();
  value: string = '';
  queryParamsSubscription?: Subscription;

  @Output() changed = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subject.pipe(debounceTime(1500)).subscribe((searchTextValue) => {
      this.handleSearch(searchTextValue);
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      if (params && Object.keys(params).length === 0) {
        this.value = '';
      }
      if (params.q) {
        this.value = params.q;
      }
    });
  }

  handleSearch(searchValue: string) {
    this.value = searchValue;
    this.changed.emit(searchValue);
  }

  onKeyup(changeEvent: any): void {
    const value = changeEvent.target.value;
    if (value !== null) {
      this.subject.next(value);
    }
  }
}
