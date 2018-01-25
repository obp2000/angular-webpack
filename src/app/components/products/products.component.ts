import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../services';
import { Product } from '../../models';

@Component({
  templateUrl: './products.html',
  providers: [
    ProductService
  ]
})

export class ProductsComponent implements OnInit {
  products: Product[];
  totalCount: number = 0;
  perPage: number = 10;
  // page: number = 1;

  constructor(private _productService: ProductService) {
  }

  ngOnInit() {
    // this.getProducts();
  }

  getProducts(page: number = 1) {
    this._productService
      .fetchAll(page)
      .subscribe(d => {
        this.products = d.results;
        this.totalCount = d.totalCount;
        this.perPage = d.perPage;
      });
  }

  deleteProduct(product: Product) {
    if (confirm('Удалить?')) {
      this._productService.deleteProduct(product)
        .subscribe(_ => {
          this.products.splice(this.products.indexOf(product), 1);
        });
    };
  }

  price_rub_m(product: Product): number {
    return this._productService.price_rub_m(product);
  };

}
