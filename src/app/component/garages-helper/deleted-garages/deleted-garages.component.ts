import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { GarageService } from 'src/app/service/garage.service';
import { Garage } from 'src/app/interface/garage';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deleted-garages',
  templateUrl: './deleted-garages.component.html',
  styleUrls: ['./deleted-garages.component.css']
})
export class DeletedGaragesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElementDeletedGarage!: DataTableDirective;

  allGarage: Garage[] = [];

  dtOptionsDeletedGarage: DataTables.Settings = {};

  dtTriggerDeletedGarage: Subject<any> = new Subject();

  constructor( private router: Router) { 
  }

  ngOnInit(): void {
    this.dtOptionsDeletedGarage = {
      ajax: {
        url: environment.baseUrl + 'api/garage/deactivated',
        dataSrc: ''
      },

      
      columns: [
        {
          // title: 'Garage Name',
          className: 'align-middle',
          // width: '100px',
          data: 'garageName',
        },
        {
          // title: 'Owner Name',
          // width: '20%',
          data: 'name'
        },
        {
          // title: 'Phone number',
          // width: '20%',
          data: 'phoneNumber'
        },
        {
          // title: 'Alternate Number',
          // width: '20%',
          data: 'alternateNumber'
        },
        {
          // title: 'Area',
          // width: '10%',
          data: 'area'
        },
        {
          // title: 'Referral Code',
          // width: '500px',
          data: 'referralCode'
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

  ngAfterViewInit(): void {
    this.dtTriggerDeletedGarage.next();
  }

  ngOnDestroy(): void {
    this.dtTriggerDeletedGarage.unsubscribe();
  }

  openInfo(info: any) {
    console.log("info" + info._id);
    this.router.navigate(['/garages/'+info.garageId]);
  }

  rerender():void {
    this.dtElementDeletedGarage.dtInstance.then((dtInstance: DataTables.Api)=> {
      dtInstance.destroy()

      this.dtTriggerDeletedGarage.next();
      console.log("render")
    });
  }

}
