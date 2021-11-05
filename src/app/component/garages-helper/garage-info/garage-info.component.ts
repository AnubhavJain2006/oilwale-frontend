import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from 'src/app/service/garage.service';

import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-garage-info',
  templateUrl: './garage-info.component.html',
  styleUrls: ['./garage-info.component.css']
})
export class GarageInfoComponent implements OnInit {
  id!: string;
  garageDetails!:Garage;
  dataLoadingStatus:boolean = true;

  constructor(private router: ActivatedRoute, private garageService: GarageService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.garageService.getGarageById(this.id).subscribe(data => {
      this.garageDetails = data;
      this.dataLoadingStatus = false;
    })
  }

}
