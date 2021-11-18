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

  addProductLoadingFlag:boolean = false;

  constructor(private productService: ProductService) {
    this.product = new FormGroup({
      productName: new FormControl('', Validators.required),
      specification: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      packingSize: new FormControl('', Validators.required),
      productImage: new FormControl(''),
      packingSizeDimension: new FormControl('mL'),
      recommandedVehicleType: new FormGroup({
        twoWheeler: new FormControl(false),
        threeWheeler: new FormControl(false),
        fourWheeler: new FormControl(false),
        trucks: new FormControl(false),
      })
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
    this.product.value.packingSize = this.product.value.packingSize + " " + this.product.value.packingSizeDimension;
    console.log(this.product.value);
    
    const addProductObject:Product = {
      productId: "",
      productName: this.product.value.productName,
      specification: this.product.value.specification,
      grade: this.product.value.grade,
      packingSize: this.product.value.packingSize,
      productImage: this.product.value.productImage,
      active: true,
      vehicleType: [],
      createdAt: "",
      updatedAt: ""
    }

    console.log(this.product.value.recommandedVehicleType);

    // bad code: please find some good technique
    if(this.product.value.recommandedVehicleType.twoWheeler == true) addProductObject.vehicleType.push('2-wheeler');
    if(this.product.value.recommandedVehicleType.threeWheeler == true) addProductObject.vehicleType.push('3-wheeler');
    if(this.product.value.recommandedVehicleType.fourWheeler == true) addProductObject.vehicleType.push('4-wheeler');
    if(this.product.value.recommandedVehicleType.trucks == true) addProductObject.vehicleType.push('trucks');
    
    // setValue({
    //   packingSize: `${this.product.value.packingSize} ${this.product.value.packingSizeDimension}`,
    // })
    this.addProductLoadingFlag = true;
    this.productService.addProduct(addProductObject).subscribe(resp => {
      console.log(resp);
      this.addProductLoadingFlag =false;
      // this.product.setValue
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
