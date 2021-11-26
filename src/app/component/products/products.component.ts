import { Product } from './../../interface/product';
import { ProductService } from './../../service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product> = [];
  productsActivities: Activity[] = [];

  // flag
  addProductLoadingFlag:boolean = false;
  productFetchLoadingFlag: boolean = true;
  activitiesLoading: boolean = false;

  constructor(private productService: ProductService, private activityService: ActivityService) {
    
    console.log("ProductList size" + this.productService.productList.length);
    if (this.productService.productList.length == 0) {
      this.loadAllProduct()

    }
    else {
      this.products = this.productService.productList;
      this.productFetchLoadingFlag = false;

    }
  }

  ngOnInit(): void {
    this.productService.refreshNeeded.subscribe(() => {
      this.loadAllProduct();
    })
  }


  async loadAllProduct() {
    await this.productService.loadAllProducts().then(resp => {
      console.log(resp);
      this.products = resp;
      this.productService.productList = this.products;

      this.productFetchLoadingFlag = false;
    }, err => {
      console.log(err)
    });
  }

  fetchProductActivities() {
    this.activitiesLoading = true;
    this.activityService.getDomainActivities('products').subscribe(data => {
      this.activitiesLoading = false;
      this.productsActivities = data;
      console.log(data);
    })
  }

}
