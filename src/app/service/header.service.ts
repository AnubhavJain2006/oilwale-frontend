import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _activeTab: string = "";

  public get activeTab(): string {
    return this._activeTab;
  }

  public set activeTab(value: string) {
    this._activeTab = value;
  }

  constructor(private router: Router) { }

  setInitialUrl() {
    const tempUrl = this.router.url;
    const urlArray = tempUrl.split("/", 2);

    console.log("ye hum url laaye h")
    console.log(urlArray)

    if( urlArray[1] === "dashboard") this._activeTab = "dashboard"
    else if ( urlArray[1] === "garages") this._activeTab = "garages"
    else if ( urlArray[1] === "customers") this._activeTab = "customers"
    else if ( urlArray[1] === "vehicles") this._activeTab = "vehicles"
    else if ( urlArray[1] === "products") this._activeTab = "products"
    else if ( urlArray[1] === "schemes") this._activeTab = "schemes"
    else if ( urlArray[1] === "orders") this._activeTab = "orders"
    else if ( urlArray[1] === "accounts") this._activeTab = "accounts"
    else if( urlArray[1] === "myactivities") this._activeTab = "myactivities"
    else if( urlArray[1] === "myaccount") this._activeTab = "myaccount"
    else {
      this._activeTab = ""
      console.log("koi bhi equal nahi hua bhai....");
    }

    console.log("header service comparision result")
    console.log(this._activeTab)
  }

}
