import { Component, OnInit, Input } from '@angular/core';
import { VehicleInfo } from 'src/app/interface/vehicle-info';

@Component({
  selector: 'app-deleted-vehicles',
  templateUrl: './deleted-vehicles.component.html',
  styleUrls: ['./deleted-vehicles.component.css']
})
export class DeletedVehiclesComponent implements OnInit {

  @Input() vehicles!: VehicleInfo[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
