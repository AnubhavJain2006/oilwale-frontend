import { LoginComponent } from './component/login/login.component';
import { AccountsComponent } from './component/accounts/accounts.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { VehicleInfoComponent } from './component/vehicles-helper/vehicle-info/vehicle-info.component';
import { SchemesComponent } from './component/schemes/schemes.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductsInfoComponent } from './component/products-helper/products-info/products-info.component';
import { CustomersComponent } from './component/customers/customers.component';
import { GaragesComponent } from './component/garages/garages.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { MyaccountComponent } from './component/myaccount/myaccount.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/AuthGaurd/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "garages", component: GaragesComponent, canActivate: [AuthGuard] },
  { path: "customers", component: CustomersComponent, canActivate: [AuthGuard] },

  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "products/:id", component: ProductsInfoComponent, canActivate: [AuthGuard] },


  { path: "schemes", component: SchemesComponent, canActivate: [AuthGuard] },
  { path: "vehicles", component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: "vehicles/:id", component: VehicleInfoComponent, canActivate: [AuthGuard]},
  { path: "accounts", component: AccountsComponent, canActivate: [AuthGuard] },
  { path: "myaccount", component: MyaccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
