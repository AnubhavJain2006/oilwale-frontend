import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-active-products',
  templateUrl: './active-products.component.html',
  styleUrls: ['./active-products.component.css']
})
export class ActiveProductsComponent implements OnInit {

  @Input() productList!: Product[];
  @Input() loading!: boolean; 

  allProducts:Product[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
  }

}
