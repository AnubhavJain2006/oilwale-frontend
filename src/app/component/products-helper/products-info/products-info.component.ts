import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.css']
})
export class ProductsInfoComponent implements OnInit {
  id !: string;
  productDetails!: Product;
  dataLoadingStatus:boolean = true;
  // newProduct!: Product;   // for update - restore

  deleteLoadingFlag: boolean = false;
  restoreLoadingFlag: boolean = false;

  constructor(private router: ActivatedRoute ,private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.productService.getProductById(this.id).subscribe((details) => {
      this.productDetails = details;
      this.dataLoadingStatus = false;
    })
  }

  onDeleteProduct(id: string) {
    this.deleteLoadingFlag = true;
    this.productService.deleteProductById(id).subscribe(data => {
      this.productDetails.active = false;
      this.deleteLoadingFlag = false;
    })
  }

  onRestoreProduct() {
    const restoreProductObj: Product = {
      productId: this.productDetails.productId,
      productName: this.productDetails.productName,
      specification: this.productDetails.specification,
      grade: this.productDetails.grade,
      packingSize: this.productDetails.packingSize,
      productImage: this.productDetails.productImage,
      createdAt: this.productDetails.createdAt,
      updatedAt: this.productDetails.updatedAt,
      active: !this.productDetails.active,
      vehicleType: this.productDetails.vehicleType
    }
    
    // this.newProduct.active = !this.newProduct.active;
    this.restoreLoadingFlag = true;
    this.productService.updateProduct(restoreProductObj).subscribe(data => {
      this.restoreLoadingFlag = false;
      this.productDetails = data;
    })

  }

}
