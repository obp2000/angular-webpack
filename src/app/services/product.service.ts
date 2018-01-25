import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Product } from "../models";
import { FileUploader } from "ng2-file-upload";

@Injectable()
export class ProductService {
  constructor(private _http: HttpClient) {}

  fetchAll(page: number = 1) {
    return this._http.get("http://localhost:3000/api/products?page=" + page).map(r => {
      let results: Array<Product> = [];
      if (r["results"]) {
        results = r["results"].map((v: any) => new Product(v));
      }
      return { totalCount: r["totalCount"], perPage: r["per_page"], results: results };
    });
  }

  autocomplete() {
    return this._http.get("http://localhost:3000/api/products").map(r => {
      let results: Array<Product> = [];
      if (r["results"]) {
        // results = r.results.map((v: any) => new Product(v));
        results = r["results"].map((v: any) => {
          return { value: v.id, name: v.name };
        });
      }
      return results;
    });
  }

  fetch(id: string) {
    return this._http.get("http://localhost:3000/api/products/" + id).map(r => {
      return new Product(r);
    });
  }

  create(product: Product) {
    // ... Set content type to JSON
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // const param: { product: Product } = { 'product': product };
    const post_observable: Observable<Product> = this._http
      .post("http://localhost:3000/api/products/", { product: product })
      .map(r => {
        return new Product(r);
      });
    return post_observable;
  }

  upload_image(uploader: FileUploader, product: Product) {
    if (uploader.queue.length > 0) {
      uploader.setOptions({
        url: "http://localhost:3000/api/products/" + product.id
      });
      uploader.queue[0].upload();
    }
  }

  update(id: string, product: Product, uploader: FileUploader) {
    if (uploader.queue.length > 0) {
      uploader.queue[0].upload();
    }
    // ... Set content type to JSON
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // const param: { product: Product } = { 'product': product };
    return this._http.put("http://localhost:3000/api/products/" + id, {
      product: product
    });
  }

  deleteProduct(product: Product) {
    return this._http.delete(
      "http://localhost:3000/api/products/" + product.id
    );
  }

  price_rub_m(product: Product): number {
    return (
      product.dollar_price *
      product.dollar_rate /
      (1000 / (product.density / (100 * 100) * product.width * 100))
    );
  }

  meters(product: Product): number {
    return product.weight / (product.density * (product.width / 100) / 1000);
  }

  density_count(product: Product): number {
    return (
      product.weight_for_count /
      product.length_for_count /
      (product.width / 100)
    );
  }
}
