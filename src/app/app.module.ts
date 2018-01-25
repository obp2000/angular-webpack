import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
// import { HttpClientModule } from '@angular/http-client';
import { HttpClientModule } from "@angular/common/http";
import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from "@angular/common";
import { APP_BASE_HREF } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
// import { HelloComponent } from './components/hello/hello.component';
import { ProductsComponent } from "./components/products/products.component";
// import { ProductFormComponent } from './components/product_form/product_form.component';
// import { ProductCreateComponent } from './components/product_create/product_create.component';
import { ProductDetailComponent } from "./components/product_detail/product_detail.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { OrdersComponent } from "./components/orders/orders.component";
// import { CustomerFormComponent } from './components/customer_form/customer_form.component';
// import { CustomerCreateComponent } from './components/customer_create/customer_create.component';
import { CustomerDetailComponent } from "./components/customer_detail/customer_detail.component";
import { ProductService } from "./services/product.service";
import { CustomerService } from "./services/customer.service";
import { OrderService } from "./services/order.service";
// import { OrderCreateComponent } from './components/order_create/order_create.component';
import { OrderDetailComponent } from "./components/order_detail/order_detail.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AuthDialogComponent } from "./components/auth-dialog/auth-dialog.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { AuthService } from "./services/auth.service";

import { FileUploadModule } from "ng2-file-upload";
import { Ng2CompleterModule } from "ng2-completer";
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from "angular2-moment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2TokenService } from "angular2-token";

import localeRu from "@angular/common/locales/ru";
import localeRuExtra from "@angular/common/locales/extra/ru";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";

registerLocaleData(localeRu, "ru", localeRuExtra);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    Ng2CompleterModule,
    MomentModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    CustomersComponent,
    CustomerDetailComponent,
    OrdersComponent,
    OrderDetailComponent,
    AppComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent
  ],
  providers: [
    ProductService,
    CustomerService,
    OrderService,
    Location,
    { provide: APP_BASE_HREF, useValue: "/" },
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
    Angular2TokenService,
    AuthService,
    AuthGuard
  ],
  entryComponents: [AuthDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
