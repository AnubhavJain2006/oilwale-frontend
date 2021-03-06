import { LoginComponent } from './component/login/login.component';

import { AccountsComponent } from './component/accounts/accounts.component';
import { AccountInfoComponent } from './component/accounts-helper/account-info/account-info.component';
import { AccountEditComponent } from './component/accounts-helper/account-edit/account-edit.component';

import { BroadcastsComponent } from './component/broadcasts/broadcasts.component';

import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { VehicleInfoComponent } from './component/vehicles-helper/vehicle-info/vehicle-info.component';
import { VehicleEditComponent } from './component/vehicles-helper/vehicle-edit/vehicle-edit.component';

import { SchemesComponent } from './component/schemes/schemes.component';
import { EditSchemeComponent } from './component/schemes-helper/edit-scheme/edit-scheme.component';
import { SchemeInfoComponent } from './component/schemes-helper/scheme-info/scheme-info.component';

import { ProductsComponent } from './component/products/products.component';
import { ProductsInfoComponent } from './component/products-helper/products-info/products-info.component';
import { ProductEditComponent } from './component/products-helper/product-edit/product-edit.component';

import { CustomersComponent } from './component/customers/customers.component';
import { CustomerInfoComponent } from './component/customers-helper/customer-info/customer-info.component';

import { GaragesComponent } from './component/garages/garages.component';
import { GarageInfoComponent } from './component/garages-helper/garage-info/garage-info.component';
import { EditGarageComponent } from './component/garages-helper/edit-garage/edit-garage.component';

import { OrdersComponent } from './component/orders/orders.component';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';

import { MyaccountComponent } from './component/myaccount/myaccount.component';
import { MyactivitiesComponent } from './component/myactivities/myactivities.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/AuthGaurd/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },

  { path: "garages", component: GaragesComponent, canActivate: [AuthGuard] },
  { path: "garages/:id", component: GarageInfoComponent, canActivate: [AuthGuard] },
  { path: "garages/:id/edit", component: EditGarageComponent, canActivate: [AuthGuard] },

  { path: "customers", component: CustomersComponent, canActivate: [AuthGuard] },
  { path: "customers/:id", component: CustomerInfoComponent, canActivate: [AuthGuard] },

  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "products/:id", component: ProductsInfoComponent, canActivate: [AuthGuard] },
  { path: "products/:id/edit", component: ProductEditComponent, canActivate: [AuthGuard] },

  { path: "schemes", component: SchemesComponent, canActivate: [AuthGuard] },
  { path: "schemes/:id", component: SchemeInfoComponent, canActivate: [AuthGuard] },
  { path: "schemes/:id/edit", component: EditSchemeComponent, canActivate: [AuthGuard] },

  { path: "vehicles", component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: "vehicles/:id", component: VehicleInfoComponent, canActivate: [AuthGuard]},
  { path: "vehicles/:id/edit", component: VehicleEditComponent, canActivate: [AuthGuard]},

  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard] },

  { path: "accounts", component: AccountsComponent, canActivate: [AuthGuard] },
  { path: "accounts/:id", component: AccountInfoComponent, canActivate: [AuthGuard] },
  { path: "accounts/:id/edit", component: AccountEditComponent, canActivate: [AuthGuard] },
  
  { path: "myaccount", component: MyaccountComponent, canActivate: [AuthGuard] },
  { path: "myactivities", component: MyactivitiesComponent, canActivate: [AuthGuard] },

  { path: "broadcasts", component: BroadcastsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
