import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-deleted-products',
  templateUrl: './deleted-products.component.html',
  styleUrls: ['./deleted-products.component.css']
})
export class DeletedProductsComponent implements OnInit {

  @Input() products!: Product[];
  @Input() loading!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  onClick(id: string) {
    this.router.navigate(['/products/' + id]);
  }

}
