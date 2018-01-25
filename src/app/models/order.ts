import {OrderItem} from '../models';
import {Customer} from '../models';

export class Order {
  id: number;
  customer_id: number;
  customer: Customer;
  customer_nick: string;
  createdAt: Date;
  updatedAt: Date;
  order_items_attributes: OrderItem[];

  constructor(obj: any) {
    this.id        = obj && obj.id              || null;
    this.customer_id = obj && obj.customer_id   || null;
    this.customer = obj && obj.customer         || new Customer({});
    this.customer_nick = obj && obj.customer_nick   || null;
    this.createdAt = obj && obj.created_at      || null;
    this.updatedAt = obj && obj.updated_at      || null;
    this.order_items_attributes = obj && obj.order_items   || [];
  };

}

