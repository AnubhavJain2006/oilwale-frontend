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
  deletedProducts: Product[] = [];
  productsActivities: Activity[] = [];

  // flag
  addProductLoadingFlag:boolean = false;
  productFetchLoadingFlag: boolean = true;
  activitiesLoading: boolean = false;
  deletedProductsFetchLoading: boolean = true;

  constructor(private productService: ProductService, private activityService: ActivityService) {
    
    console.log("ProductList size" + this.productService.productList.length);

    if (this.productService.productList.length == 0) {
      this.loadAllProduct()
    }
    else {
      this.products = this.productService.productList;
      this.productFetchLoadingFlag = false;
    }

    if (this.productService.deletedProductsList.length == 0) {
      this.getDeletedProducts();
    }
    else {
      this.deletedProducts = this.productService.deletedProductsList;
      this.deletedProductsFetchLoading = false;
    }
  }

  ngOnInit(): void {
    this.productService.refreshNeeded.subscribe(() => {
      this.loadAllProduct();
      this.getDeletedProducts();
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

  async getDeletedProducts() {
    await this.productService.getDeletedProducts().then(data => {
      console.log(data);
      this.deletedProducts = data;
      this.productService.deletedProductsList = this.deletedProducts;

      this.deletedProductsFetchLoading = false;
      
    })
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
