import {Injectable} from '@angular/core';
// import {Request, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Order} from '../models';
import {OrderItem} from '../models';

@Injectable()
export class OrderService {
  constructor(private _http: HttpClient) {
  }

  fetchAll() {
    return this._http
      .get('http://localhost:3000/api/orders')
      .map(r => {
        let results: Array<Order> = [];
        if (r['results']) {
          results = r['results'].map((v: any) => new Order(v));
        }
        return { totalCount: r['totalCount'], results: results };
      });
  }

  fetch(id: string) {
    return this._http
      .get('http://localhost:3000/api/orders/' + id)
      .map(r => {return new Order(r);});
  }

  create(order: Order) {
    // ... Set content type to JSON
    // let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers }); // Create a request option
    // let param: { order: Order } = { 'order': order };
    return this._http.post('http://localhost:3000/api/orders/', { 'order': order });
  }

  update(id: string, order: Order) {
    // ... Set content type to JSON
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers }); // Create a request option
    // let param: { order: Order } = { 'order': order };
    return this._http.put('http://localhost:3000/api/orders/' + id, { 'order': order });
  }

  deleteOrder(order: Order) {
    return this._http.delete('http://localhost:3000/api/orders/' + order.id);
  }
}
