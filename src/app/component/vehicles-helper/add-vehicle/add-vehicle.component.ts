import { Component, OnInit, Input } from '@angular/core';

import { VehicleCompany } from 'src/app/interface/vehicle-company';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Input() vehicleCompies!: VehicleCompany[];

  allCompanies:VehicleCompany[] = [];

  constructor() { 
    this.allCompanies = this.vehicleCompies;
  }

  ngOnInit(): void {
  }

}
