import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-active-products',
  templateUrl: './active-products.component.html',
  styleUrls: ['./active-products.component.css']
})
export class ActiveProductsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  allProducts:Product[] = [];

  constructor(private router: Router, private productService: ProductService) { 
    // this.allProducts =  this.productService.loadAllProducts().then;
  }

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
        },
        {
          title: 'Recommanded for',
          data: 'vehicleType',
          render: (data) => {
            if (data == null) 
              return "-";
            // const outputString = "";
            // for (let i = 0; i < data.length; i++) {
            //   outputString.concat(data[i]).concat(" ");
            // }
            return data ;
          }
        },
        {
          title: 'Status',
          data: 'active',
          render: (data) => {
            if(data == true) return "<span class='badge bg-success'>Active</span>";
            else return "<span class='badge bg-danger'>Deleted</span>";
          }
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
