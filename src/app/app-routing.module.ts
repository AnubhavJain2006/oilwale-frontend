import { LoginComponent } from './component/login/login.component';
import { AccountsComponent } from './component/accounts/accounts.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { SchemesComponent } from './component/schemes/schemes.component';
import { ProductsComponent } from './component/products/products.component';
import { CustomersComponent } from './component/customers/customers.component';
import { GaragesComponent } from './component/garages/garages.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "garages", component: GaragesComponent },
  { path: "customers", component: CustomersComponent },
  { path: "products", component: ProductsComponent },
  { path: "schemes", component: SchemesComponent },
  { path: "vehicles", component: VehiclesComponent },
  { path: "accounts", component: AccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
