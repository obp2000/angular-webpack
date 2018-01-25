import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
//import {CustomerFormComponent} from '../../components';
import { CustomerService } from "../../services";
import { Customer } from "../../models";

@Component({
  templateUrl: "./customer_detail.html",
  providers: [CustomerService]
})
export class CustomerDetailComponent implements OnInit {
  form: FormGroup;
  customer: Customer = new Customer({});

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _customerService: CustomerService
  ) {
    this.form = new FormGroup({
      nick: new FormControl("", Validators.required),
      name: new FormControl("")
    });
  }

  ngOnInit(): void {
    if (this._route.snapshot.params["id"]) {
      this._customerService
        .fetch(this._route.snapshot.params["id"])
        .subscribe(customer => (this.customer = customer));
    }
  }

  onSubmit(): void {
    if (this._route.snapshot.params["id"]) {
      this._customerService
        .update(this._route.snapshot.params["id"], this.customer)
        .subscribe(_ => {
          this._router.navigate(["/customers"]);
        });
    } else {
      this._customerService.create(this.customer).subscribe(_ => {
        this._router.navigate(["/customers"]);
      });
    }
  }
}
