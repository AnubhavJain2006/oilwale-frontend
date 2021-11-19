import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from 'src/app/service/scheme.service';

import { Scheme } from 'src/app/interface/scheme';

@Component({
  selector: 'app-edit-scheme',
  templateUrl: './edit-scheme.component.html',
  styleUrls: ['./edit-scheme.component.css']
})
export class EditSchemeComponent implements OnInit {
  id: string = '';
  schemeDetails!: Scheme;
  dataLoadingStatus: boolean = true;

  displayName: string = "";

  // utility
  updateLoadingFlag: boolean = false;
  validationFlag: boolean = true;

  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
    this.schemeService.getSchemeById(this.id).subscribe(resp => {
      this.schemeDetails = resp;
      this.displayName = this.schemeDetails.schemeName;
      this.dataLoadingStatus = false;

      // slight modifications
      // this.schemeDetails.startedAt = this.schemeDetails.startedAt.substring(0,9);
      // this.schemeDetails.endedAt = this.schemeDetails.endedAt.substring(0,9);

      console.log(this.schemeDetails.startedAt)
      console.log(this.schemeDetails.endedAt)

    }, error => {
      console.log(error);
    })
  }

  validateForm() {
    if (this.schemeDetails.schemeName == "") {
      this.validationFlag = false;
      alert("Name cannot be empty!")
      return;
    }

    if (this.schemeDetails.description == "") {
      this.validationFlag = false;
      alert("Description cannot be empty!")
      return;
    }

    if (this.schemeDetails.endedAt.valueOf() < this.schemeDetails.startedAt.valueOf()) {
      this.validationFlag = false;
      alert("Scheme is ending before it starts!");
      return;
    }

    this.validationFlag = true;
  }

  updateSchemeInfo() {
    this.validateForm();
    console.log("Do better validation!");
    this.updateLoadingFlag = true;
    this.schemeService.updateScheme(this.schemeDetails).subscribe( data => {
      this.schemeDetails = data;
      this.displayName = this.schemeDetails.schemeName;
      this.updateLoadingFlag = false;
    })
  }

}
