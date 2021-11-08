import { AuthGuard } from './service/AuthGaurd/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GaragesComponent } from './component/garages/garages.component';
import { CustomersComponent } from './component/customers/customers.component';
import { ProductsComponent } from './component/products/products.component';
import { SchemesComponent } from './component/schemes/schemes.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsComponent } from './component/accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt/jwt.interceptor';
import { MyaccountComponent } from './component/myaccount/myaccount.component';
import { LoginFormComponent } from './component/login-helper/login-form/login-form.component';
import { ForgetPaaswordComponent } from './component/login-helper/forget-paasword/forget-paasword.component';
import { AllVehiclesComponent } from './component/vehicles-helper/all-vehicles/all-vehicles.component';
import { AddVehicleComponent } from './component/vehicles-helper/add-vehicle/add-vehicle.component';
import { VehicleInfoComponent } from './component/vehicles-helper/vehicle-info/vehicle-info.component';
import { ProductsInfoComponent } from './component/products-helper/products-info/products-info.component';
import { CustomerInfoComponent } from './component/customers-helper/customer-info/customer-info.component';
import { GarageInfoComponent } from './component/garages-helper/garage-info/garage-info.component';
import { SchemeInfoComponent } from './component/schemes-helper/scheme-info/scheme-info.component';
import { AccountInfoComponent } from './component/accounts-helper/account-info/account-info.component';
import { VehicleEditComponent } from './component/vehicles-helper/vehicle-edit/vehicle-edit.component';
import { ProductEditComponent } from './component/products-helper/product-edit/product-edit.component';
import { DeletedGaragesComponent } from './component/garages-helper/deleted-garages/deleted-garages.component';
import { ActiveGaragesComponent } from './component/garages-helper/active-garages/active-garages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    GaragesComponent,
    CustomersComponent,
    ProductsComponent,
    SchemesComponent,
    VehiclesComponent,
    AccountsComponent,
    LoginComponent,
    MyaccountComponent,
    LoginFormComponent,
    ForgetPaaswordComponent,
    AllVehiclesComponent,
    AddVehicleComponent,
    VehicleInfoComponent,
    ProductsInfoComponent,
    CustomerInfoComponent,
    GarageInfoComponent,
    SchemeInfoComponent,
    AccountInfoComponent,
    VehicleEditComponent,
    ProductEditComponent,
    DeletedGaragesComponent,
    ActiveGaragesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
