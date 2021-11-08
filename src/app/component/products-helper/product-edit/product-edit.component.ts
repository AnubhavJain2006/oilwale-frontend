import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id !: string;
  productDetails!: Product;
  dataLoadingStatus:boolean = true;

  productDisplayName: string = "";

  // flags
  updateProductLoadingFlag: boolean = false;
  updateProductSuccessFlag: boolean = false;
  updateProductErrorFlag: boolean = false;
  validationMessageShow: boolean = false;

  validationFlag: boolean = true;

  constructor(private router: ActivatedRoute ,private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.productService.getProductById(this.id).subscribe((details) => {
      this.productDetails = details;
      this.dataLoadingStatus = false;
      this.productDisplayName = this.productDetails.productName;
    })
  }

  updateProduct(): void {

    if(!this.validationCheck()){
      this.validationFlag = false;

      this.validationMessageShow = true;

      setTimeout(() => {
        this.validationMessageShow = false;
      }, 5000);
      return;
    }

    this.updateProductLoadingFlag = true;
    this.productService.updateProduct(this.productDetails).subscribe(data => {
      this.updateProductLoadingFlag = false;
      this.updateProductSuccessFlag = true;
      this.productDetails = data;

      this.productDisplayName = this.productDetails.productName;
      setTimeout(() => {
        this.updateProductSuccessFlag = false;
      }, 5000);
    })
  }

  validationCheck(): boolean {
    if (this.productDetails.productName.length == 0)
      return false;

    if (this.productDetails.specification.length == 0)
      return false;

    if (this.productDetails.grade.length == 0)
      return false;

    if (this.productDetails.packingSize.length == 0)
      return false;

    return true;
  }

}
