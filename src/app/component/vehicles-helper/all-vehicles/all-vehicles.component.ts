import { Component, OnInit, AfterViewInit,Renderer2, Input } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent implements OnInit {
  dtOptions: DataTables.Settings = {}

  constructor(private router:Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: {
        url: 'https://oilwale.herokuapp.com/api/getVehicles',
        dataSrc: ''
      },
      
      columns: [
        {
          title: 'Company',
          className: 'align-middle order-column',
          width: "150px",
          data: 'vehicleCompany'
        },
        {
          title: 'Model',
          className: 'align-middle',
          data: 'vehicleModel'
        },
        {
          title: 'Added On',
          data: 'createdAt',
          className: 'align-middle',
          width: '150px',
          render: function (data) {
           let date = new Date(data);
           return date.toDateString();
          }
        },
        { 
          title: "Suggested Products",
          data: 'suggestedProduct',
          className: 'align-middle',
          width: '100px',
          render: function(data) {
            return data.length;
          },
        },
        {
          title: "Status",
          data: 'active',
          className: 'align-middle',
          width: '100px',
          render: (data) => {
            if ( data == true) {
              return '<span class="badge bg-success">Active</span>';
            }
            else {
              return '<span class="badge bg-secondary">Deactivated</span>';
            }
          }
        }],
        rowCallback:(row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).off('click');
          $('td', row).on('click', () => {
            self.openInfo(data);
          });
          return row;
        } 
      
    }
  }


openInfo(info: any) {
  console.log("info" + info._id);
  this.router.navigate(['/vehicles/'+info._id]);
}

}
