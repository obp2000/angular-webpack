import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Customer } from "../models";

@Injectable()
export class CustomerService {
  constructor(private _http: HttpClient) {}

  fetchAll() {
    return this._http.get("http://localhost:3000/api/customers").map(r => {
      let results: Array<Customer> = [];
      if (r["results"]) {
        results = r["results"].map((v: any) => new Customer(v));
      }
      return { totalCount: r["totalCount"], results: results };
    });
  }

  autocomplete() {
    return this._http.get("http://localhost:3000/api/customers").map(r => {
      let results: Array<Customer> = [];
      if (r["results"]) {
        results = r["results"].map((v: any) => new Customer(v));
      }
      return results;
    });
  }

  fetch(id: string) {
    return this._http
      .get("http://localhost:3000/api/customers/" + id)
      .map(r => {
        return new Customer(r);
      });
  }

  create(customer: Customer) {
    return this._http.post("http://localhost:3000/api/customers/", {
      customer: customer
    });
  }

  update(id: string, customer: Customer) {
    return this._http.put("http://localhost:3000/api/customers/" + id, {
      customer: customer
    });
  }

  deleteCustomer(customer: Customer) {
    return this._http.delete(
      "http://localhost:3000/api/customers/" + customer.id
    );
  }
}
