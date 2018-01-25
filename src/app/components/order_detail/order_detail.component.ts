import {Component, OnChanges, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../../services';
import {Order} from '../../models';
import {Customer} from '../../models';
import {Product} from '../../models';
import {OrderItem} from '../../models';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  templateUrl: "./order_detail.html"
})
export class OrderDetailComponent implements OnInit {
  form: FormGroup;
  order: Order = new Order({});
  _customerCompleter: CompleterData;
  _productCompleter: CompleterData;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _orderService: OrderService,
    private _fb: FormBuilder,
    private completerService: CompleterService
  ) {
    this.createForm();
    this._customerCompleter = completerService.remote(
      "http://localhost:3000/api/customers/autocomplete/", "nick", "nick");
    this._productCompleter = completerService.remote(
      "http://localhost:3000/api/products/autocomplete/", "name", "name");
  }

  createForm() {
    // this.form = this._fb.group({
    //   // customer_id: [""],
    //   customer: this._fb.group(this.order.customer),
    //   order_items_attributes: this._fb.array([])
    // });
    this.form = this._fb.group(this.order);
    this.form.setControl('customer', this._fb.group(this.order.customer));
    this.form.setControl('order_items_attributes', this._fb.array([]));
  };

  ngOnInit(): void {
    if (this._route.snapshot.params["id"]) {this.setOrder();};
  };

  setOrder() {
    this._orderService.fetch(this._route.snapshot.params["id"]).subscribe(order => {
      this.order = order;
      this.form.patchValue({customer_id: order.customer_id});
      this.form.patchValue({customer: order.customer});
      order.order_items_attributes.map(order_item => {
        this.addOrderItemAttribute(order_item);
      })
    });
  };

  addOrderItemAttribute(order_item: OrderItem) {
    const order_itemFG = this._fb.group(order_item);
    order_itemFG.setControl('product', this._fb.group(order_item.product));
    order_itemFG.addControl('_destroy', this._fb.control(false));
    this.orderItemsAttributesFormArray.push(order_itemFG);
  };

  get orderItemsAttributesFormArray(): FormArray {
    return this.form.get("order_items_attributes") as FormArray;
  }

  addOrderItem() {
    this.addOrderItemAttribute(new OrderItem({}));
  }

  removeOrderItem(i: number) {
    if (confirm("Удалить?")) {
      this.orderItemsAttributesFormArray.controls[i].patchValue({_destroy: true});
    }
  }

  onCustomerSelected(item: CompleterItem) {
    if (item) {
      this.form.patchValue({
        customer: item.originalObject,
        customer_id: item.originalObject.id
      });
    };
  }

  onProductSelected(item: CompleterItem, order_itemFG: FormGroup) {
    if (item) {
      order_itemFG.setControl('product', this._fb.group(item.originalObject));
      order_itemFG.patchValue({
        product_id: item.originalObject.id,
        price: item.originalObject.price});
    };
  }

  onSubmit(): void {
    const formModel = this.form.value;
    this.order = {
      id: this.order.id,
      customer_id: formModel.customer_id,
      customer: formModel.customer,
      customer_nick: formModel.customer.nick,
      createdAt: this.order.createdAt,
      updatedAt: this.order.updatedAt,
      order_items_attributes: formModel.order_items_attributes.map(
        (order_item: OrderItem) => Object.assign({}, order_item)
      )
    };
    // this.order = new Order({
    //   id: this.order.id,
    //   customer_id: formModel.customer_id,
    //   order_items_attributes: formModel.order_items_attributes.map(
    //     (order_item: OrderItem) => Object.assign({}, order_item)
    //   )
    // });
    if (this._route.snapshot.params["id"]) {
      this._orderService.update(this._route.snapshot.params["id"], this.order).subscribe(_ => {
        alert("Успешно сохранен!");
        this._router.navigate(["/orders", this._route.snapshot.params["id"]]);
      });
    } else {
      this._orderService.create(this.order).subscribe(_ => {
        alert("Успешно создан!");
        this._router.navigate(["/orders"]);
      });
    }
  }

  revert() {
    this.ngOnInit();
  }

  get orderSum(): number {
    if (this.orderItemsAttributesFormArray.controls.length > 0) {
      return this.orderItemsAttributesFormArray.controls
        .filter(order_itemFG => !order_itemFG.get("_destroy").value)
        .map(
          order_itemFG =>
            order_itemFG.get("amount").value * order_itemFG.get("price").value
        )
        .reduce((sum, curr) => sum + curr);
    }
  }

  get orderMeters(): number {
    if (this.orderItemsAttributesFormArray.controls.length > 0) {
      return this.orderItemsAttributesFormArray.controls
        .filter(order_itemFG => !order_itemFG.get("_destroy").value)
        .map(order_itemFG => 1 * order_itemFG.get("amount").value)
        .reduce((sum, curr) => sum + curr);
    }
  }

  get orderWeight(): number {
    if (this.orderItemsAttributesFormArray.controls.length > 0) {
      return this.orderItemsAttributesFormArray.controls
        .filter(order_itemFG => !order_itemFG.get("_destroy").value)
        .map(
          order_itemFG =>
            order_itemFG.get("amount").value *
            order_itemFG.get("product.density").value *
            order_itemFG.get("product.width").value / 100
        )
        .reduce((sum, curr) => sum + curr);
    }
  }

  get orderItemsAmount(): number {
    if (this.orderItemsAttributesFormArray.controls.length > 0) {
      return this.orderItemsAttributesFormArray.controls
        .filter(order_itemFG => !order_itemFG.get("_destroy").value)
        .map(order_itemFG => 1)
        .reduce((sum, curr) => sum + curr);
    }
  }
}
