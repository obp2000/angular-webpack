import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
// import { DatePipe } from '@angular/common';
import { CustomerService } from "../../services";
import { Customer } from "../../models";

@Component({
  templateUrl: "./customers.html.haml"
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  totalCount: number = 0;
  closeResult: string;

  constructor(
    private _customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this._customerService.fetchAll().subscribe(d => {
      this.customers = d.results;
      this.totalCount = d.totalCount;
    });
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Удалить?")) {
      this._customerService.deleteCustomer(customer).subscribe(_ => {
        this.customers.splice(this.customers.indexOf(customer), 1);
      });
    }
  }

  open(content: any) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  // createdAt1(customer: Customer) {
  //   customer.createdAt.
  // };
}
