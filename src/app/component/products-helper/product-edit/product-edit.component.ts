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

}
