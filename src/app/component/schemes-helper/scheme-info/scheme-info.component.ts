import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from 'src/app/service/scheme.service';

import { Scheme } from 'src/app/interface/scheme';
import { SchemeInfo } from 'src/app/interface/scheme-info';

@Component({
  selector: 'app-scheme-info',
  templateUrl: './scheme-info.component.html',
  styleUrls: ['./scheme-info.component.css']
})
export class SchemeInfoComponent implements OnInit {
  id: string = '';
  schemeDetails!: SchemeInfo;
  dataLoadingStatus: boolean = true;

  // flags
  deleteSchemeLoading: boolean = false;
  restoreSchemeLoading: boolean = false;
  schemeStatsLoading: boolean = true;

  // utilities
  garageStatsArray: number[] = [];

  type = 'pie';
  data = {
    datasets: [
      {
        data: this.garageStatsArray,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ]
      }
    ],
    labels: ["Accepted", "Not Accepted"],
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
    this.schemeService.getSchemeById(this.id).subscribe(resp => {
      this.schemeDetails = resp;
      this.dataLoadingStatus = false;

      this.fetchStats();

      console.log(resp);

    }, error => {
      console.log(error);
    })
  }

  onDeleteScheme(id: string):void {
    this.deleteSchemeLoading = true;
    this.schemeService.deleteScheme(id).subscribe(data => {
      this.deleteSchemeLoading = false;
      this.schemeDetails.scheme.status = data.status;
    })
  }

  onRestoreScheme(): void {
    const restoreObj:Scheme = {
      schemeId : this.schemeDetails.scheme.schemeId,
      schemeName : this.schemeDetails.scheme.schemeName,
      description : this.schemeDetails.scheme.description,
      status : true,
      startedAt : this.schemeDetails.scheme.startedAt,
      endedAt : this.schemeDetails.scheme.endedAt,
      targetGroup : this.schemeDetails.scheme.targetGroup,
      productList : this.schemeDetails.products.map(x => x.productId),
      vehicleType: this.schemeDetails.scheme.vehicleType,
      createdAt: this.schemeDetails.scheme.createdAt,
      updatedAt: this.schemeDetails.scheme.updatedAt
    }

    this.restoreSchemeLoading = true;
    this.schemeService.updateScheme(restoreObj).subscribe(data => {
      this.schemeDetails.scheme.status = data.status;
      this.restoreSchemeLoading = false;
    })
  }

  fetchStats() {
    this.schemeService.getSchemeStats(this.schemeDetails.scheme.schemeId).subscribe(data => {
      this.garageStatsArray.push(data.NumberOfGarageAccepted);
      this.garageStatsArray.push(data.NumberOfGarageRejected);

      this.schemeStatsLoading = false;
      
    })
  }
}
