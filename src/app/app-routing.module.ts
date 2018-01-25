import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailComponent } from "./components/product_detail/product_detail.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { CustomerDetailComponent } from "./components/customer_detail/customer_detail.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrderDetailComponent } from "./components/order_detail/order_detail.component";
import { ProfileComponent } from "./components/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "products/new", component: ProductDetailComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "customers", component: CustomersComponent },
  { path: "customers/new", component: CustomerDetailComponent },
  { path: "customers/:id", component: CustomerDetailComponent },
  { path: "orders", component: OrdersComponent },
  { path: "orders/new", component: OrderDetailComponent },
  { path: "orders/:id", component: OrderDetailComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },

  { path: "", redirectTo: "/products", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
