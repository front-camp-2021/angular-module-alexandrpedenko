import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input('currentPage') currentPageProps?: number;
  @Input('limit') limitProps: number = environment.limit;
  @Input('url') urlProps?: string;

  @Input('totalObservable') totalObservableProps?: Observable<string | null>;

  pages?: number[];
  pagesTotalCount: number = 0;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.totalObservableProps?.subscribe((val) => {
      if (val !== null) {
        this.pagesTotalCount = Math.ceil(parseInt(val) / this.limitProps);
        this.pages = this.utilsService.range(1, this.pagesTotalCount);
      }
    });
  }
}
