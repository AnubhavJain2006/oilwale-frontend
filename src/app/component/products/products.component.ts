import { Product } from './../../interface/product';
import { ProductService } from './../../service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product> = [];
  product: FormGroup;
  newAddedProduct: any = "";
  constructor(private productService: ProductService) {
    this.product = new FormGroup({
      productName: new FormControl('', Validators.required),
      specification: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      packingSize: new FormControl('', Validators.required),
      productImage: new FormControl('')
    })
    console.log("ProductList size" + this.productService.productList.length);
    if (this.productService.productList.length == 0) {
      this.loadAllProduct()

    }
    else {
      this.products = this.productService.productList;
    }
  }

  ngOnInit(): void {
    this.productService.refreshNeeded.subscribe(() => {
      this.loadAllProduct();
    })
  }

  addProduct() {
    console.log(this.product.value);
    this.productService.addProduct(this.product.value).subscribe(resp => {
      console.log(resp);
      this.newAddedProduct = resp;
      this.product.reset();
    }, err => {
      console.log(err);
    })
  }

  async loadAllProduct() {
    await this.productService.loadAllProducts().then(resp => {
      console.log(resp);
      this.products = resp;
      this.productService.productList = this.products;
    }, err => {
      console.log(err)
    });
  }

}
