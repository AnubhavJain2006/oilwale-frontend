import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleInfo } from 'src/app/interface/vehicle-info';

@Component({
  selector: 'app-deleted-vehicles',
  templateUrl: './deleted-vehicles.component.html',
  styleUrls: ['./deleted-vehicles.component.css']
})
export class DeletedVehiclesComponent implements OnInit {

  @Input() vehicles!: VehicleInfo[];
  @Input() loading!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(id: string) {
    this.router.navigate(['/vehicles/' + id]);
  }

}
