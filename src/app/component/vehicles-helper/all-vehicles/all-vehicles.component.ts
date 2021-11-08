import { Component, OnInit, AfterViewInit,Renderer2, Input, OnDestroy, ViewChild } from '@angular/core';
// import { VehicleService } from 'src/app/service/vehicle.service';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { VehicleInfo } from 'src/app/interface/vehicle-info';


@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() allVehicles!: VehicleInfo[];
  @Input() refreshDataFlag!: boolean;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  // dtSource: DataTables.Api = ;

  dtOptions: DataTables.Settings = {}

  dtTrigger: Subject<any> = new Subject();

  constructor(private router:Router, ) { }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: {
        url: 'https://oilwale.herokuapp.com/api/getVehicles',
        dataSrc: ''
      },
      info: true,
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
        }, 
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  openInfo(info: any) {
    console.log("info" + info._id);
    this.router.navigate(['/vehicles/'+info._id]);
  }

  rerender():void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=> {
    dtInstance.destroy()

    this.dtTrigger.next();
  })
  }

  ajaxReloadFunction() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    })
  }

  
}
