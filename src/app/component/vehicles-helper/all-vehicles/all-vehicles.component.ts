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
export class AllVehiclesComponent implements OnInit{
  @Input() allVehicles!: VehicleInfo[];
  @Input() loading!: boolean;

  constructor(private router:Router, ) { }

  ngOnInit(): void {

  }

  onClick(id: string) {
    this.router.navigate(['/vehicles/' + id]);
  }

}
