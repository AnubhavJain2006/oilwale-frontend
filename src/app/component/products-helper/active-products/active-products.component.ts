import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-active-products',
  templateUrl: './active-products.component.html',
  styleUrls: ['./active-products.component.css']
})
export class ActiveProductsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: {
        url: "https://oilwale.herokuapp.com/api/products",
        dataSrc: ""
      },

      columns: [
        {
          title: 'Name',
          data: 'productName'
        },
        {
          title: 'Specification',
          data: 'specification'
        },
        {
          title: 'Grade',
          data: 'grade'
        },
        {
          title: 'Packing Size',
          data: 'packingSize'
        }
      ],

      rowCallback:(row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.openInfo(data);
        });
        return row;
      }, 

    }
  }

  openInfo(info: any) {
    console.log("info" + info.productId);
    this.router.navigate(['/products/'+info.productId]);
  }

}
