import { ViewEncapsulation, Component, OnInit } from "@angular/core";
import { OrderService } from "../../services";
import { Order } from "../../models";

@Component({
  templateUrl: "./orders.html",
  providers: [OrderService]
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  totalCount: number = 0;

  constructor(private _orderService: OrderService) {}

  ngOnInit() {
    this._orderService.fetchAll().subscribe(d => {
      this.orders = d.results;
      this.totalCount = d.totalCount;
    });
  }

  deleteOrder(order: Order) {
    if (confirm("Удалить?")) {
      this._orderService.deleteOrder(order).subscribe(_ => {
        this.orders.splice(this.orders.indexOf(order), 1);
      });
    }
  }
}
