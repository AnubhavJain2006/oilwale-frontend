import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Vehicle } from 'src/app/interface/vehicle';
import { data } from 'jquery';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent implements OnInit {
  
  // dtOptions: DataTables.Settings = {}
  // vehicles: Vehicle[] = [];

  // using trigger to ensure fetching before rendering
  // dtTrigger: Subject<any> = new Subject<any>();

  // allVehicles:Vehicle[] = [];

  constructor(private vehicleService: VehicleService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    $("#allVehicleTable").DataTable({
      ajax: {
        url: 'https://oilwale.herokuapp.com/api/getVehicles',
        dataSrc: ''
      },
      
      
      columns: [
        {
        
          data: 'vehicleCompany'
        },
        {
         
          data: 'vehicleModel'
        },
        {
          // type: 'datetime',
          
          data: 'createdAt',
          render: function (data) {
           let date = new Date(data);
           return date.toDateString();
          }
        },
        {
          
          data: 'suggestedProduct',
          render: function(data) {
            return data.length;
          }
        },
        {
          
          data: 'active',
          render: (data) => {
            if ( data == true) {
              return '<span class="badge bg-success">Active</span>';
            }
            else {
              return '<span class="badge bg-secondary">Deactivated</span>';
            }
          }
        }
      ],
      
    })
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 4,    
    // }

    // this.httpClient.get<Vehicle[]>('https://oilwale.herokuapp.com/api/getVehicles')
    //   .subscribe( data => {
    //     this.allVehicles = (data as any).data;
    //     this.dtTrigger.next();
    //   })

    // this.vehicleService.getVehicles()
    //   .subscribe(data => {
    //     this.allVehicles = (data as any).data;
    //     // calling dt trigger to manually render table
    //     this.dtTrigger.next();
    //   });
  }

  ngOnDestroy(): void {
    // unsubscribe to event
    // this.dtTrigger.unsubscribe();
  }

reloadVehicles() {
  console.log("haha");
  var vehiceTable = $("#allVehicleTable").DataTable()

  vehiceTable.destroy();
  $("#allVehicleTable").DataTable({
    ajax: {
      url: 'https://oilwale.herokuapp.com/api/getVehicles',
      dataSrc: ''
    },
    
    
    columns: [
      {
        
        data: 'vehicleCompany'
      },
      {
       
        data: 'vehicleModel'
      },
      {
        
        data: 'createdAt'
      },
      {
        
        data: '_id'
      },
      {
        
        data: 'vehicleCompanyId'
      }
    ]  
  })

}

}
