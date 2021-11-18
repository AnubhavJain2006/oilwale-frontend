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

  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
    this.schemeService.getSchemeById(this.id).subscribe(resp => {
      this.schemeDetails = resp;
      this.displayName = this.schemeDetails.schemeName;
      this.dataLoadingStatus = false;
    }, error => {
      console.log(error);
    })
  }

}
