import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@app/models/backend';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() productsList: ProductInterface[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
