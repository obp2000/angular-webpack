import {Product} from '../models';

export class OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product: Product;
  // product_name: string;
  amount: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  // _destroy: boolean;
  // density: number;
  // width: number;
  // product_price: number;

  constructor(obj: any) {
    this.id        = obj && obj.id              || null;
    this.order_id = obj && obj.order_id         || null;
    this.product_id = obj && obj.product_id     || null;
    this.product = obj && obj.product           || new Product({});
    // this.product_name = obj && obj.product_name || null;
    this.amount = obj && obj.amount             || 0;
    this.price = obj && obj.price               || null;
    this.createdAt = obj && obj.created_at      || null;
    this.updatedAt = obj && obj.updated_at      || null;
    // this._destroy = false;
    // this.density = obj && obj.density           || 0;
    // this.width = obj && obj.width               || 0;
    // this.product_price = obj && obj.product_price  || 0;
  };

  public orderItemWeight() {
      if (this.amount && this.product.density && this.product.width) {
       return (this.amount * this.product.density * this.product.width / 100);
      };
  };


}

