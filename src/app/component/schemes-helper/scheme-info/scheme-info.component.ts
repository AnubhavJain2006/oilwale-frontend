import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from 'src/app/service/scheme.service';

import { Scheme } from 'src/app/interface/scheme';

@Component({
  selector: 'app-scheme-info',
  templateUrl: './scheme-info.component.html',
  styleUrls: ['./scheme-info.component.css']
})
export class SchemeInfoComponent implements OnInit {
  id: string = '';
  schemeDetails!: Scheme;
  dataLoadingStatus: boolean = true;

  // flags
  deleteSchemeLoading: boolean = false;
  restoreSchemeLoading: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
    this.schemeService.getSchemeById(this.id).subscribe(resp => {
      this.schemeDetails = resp;
      this.dataLoadingStatus = false;
    }, error => {
      console.log(error);
    })
  }

  onDeleteScheme(id: string):void {
    this.deleteSchemeLoading = true;
    this.schemeService.deleteScheme(id).subscribe(data => {
      this.deleteSchemeLoading = false;
      this.schemeDetails = data;
    })
  }

  onRestoreScheme(): void {
    const restoreObj:Scheme = {
      schemeId : this.schemeDetails.schemeId,
      schemeName : this.schemeDetails.schemeName,
      description : this.schemeDetails.description,
      status : true,
      startedAt : this.schemeDetails.startedAt,
      endedAt : this.schemeDetails.endedAt,
      targetGroup : this.schemeDetails.targetGroup,
      productList : this.schemeDetails.productList,
      createdAt: this.schemeDetails.createdAt,
      updatedAt: this.schemeDetails.updatedAt
    }

    this.restoreSchemeLoading = true;
    this.schemeService.updateScheme(restoreObj).subscribe(data => {
      this.schemeDetails = data;
      this.restoreSchemeLoading = false;
    })

  }
}
