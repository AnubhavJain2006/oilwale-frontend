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
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsComponent } from './component/accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
