import { Component, OnInit, Input, Directive } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import { NgForm, NgModel } from "@angular/forms";
import {NgForm, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ProductService } from "../../services";
import { Product } from "../../models";
import { FileSelectDirective, FileDropDirective, FileUploader } from "ng2-file-upload";

const URL = "http://localhost:3000/api/products/";

@Component({
  templateUrl: "./product_detail.html"
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product = new Product({});
  public uploader: FileUploader;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this._route.snapshot.params["id"]) {
      this._productService
        .fetch(this._route.snapshot.params["id"])
        .subscribe(
          product => {
            this.product = product;
            this.id = 6;
            // alert(this.product.name)
          });
      this.uploader = new FileUploader({
        url: URL + this._route.snapshot.params["id"],
        method: "put",
        itemAlias: "product[image]"
      });
    } else {
      this.uploader = new FileUploader({
        method: "put",
        itemAlias: "product[image]"
      });
    }
  }

  onSubmit(): void {
    if (this._route.snapshot.params["id"]) {
      this._productService
        .update(this._route.snapshot.params["id"], this.product, this.uploader)
        .subscribe(_ => {
          this._router.navigate(["/products"]);
        });
    } else {
      this._productService
        .create(this.product)
        .subscribe(p => {
          this._productService.upload_image(this.uploader, p);
          this._router.navigate(["/products"]);
      });
    }
  }

  get price_rub_m(): number {
    return this._productService.price_rub_m(this.product);
  }

  get meters(): number {
    return this._productService.meters(this.product);
  }

  get density_count(): number {
    return this._productService.density_count(this.product);
  }
}
