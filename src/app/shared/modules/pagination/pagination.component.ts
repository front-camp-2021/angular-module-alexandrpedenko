import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { Observable, Subject } from 'rxjs';
import { environment } from '@src/environments/environment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  private destroy = new Subject<any>();

  @Input('currentPage') currentPageProps?: number;
  @Input('limit') limitProps: number = environment.limit;
  @Input('url') urlProps?: string;
  @Input('totalObservable') totalObservableProps?: Observable<string | null>;

  pages?: number[];
  pagesTotalCount: number = 0;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.totalObservableProps?.pipe(takeUntil(this.destroy)).subscribe((val) => {
      if (val !== null) {
        this.pagesTotalCount = Math.ceil(parseInt(val) / this.limitProps);
        this.pages = this.utilsService.range(1, this.pagesTotalCount);
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
