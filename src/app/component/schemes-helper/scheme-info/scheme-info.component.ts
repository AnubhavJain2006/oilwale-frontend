import { Scheme } from './../../../interface/scheme';
import { SchemeService } from './../../../service/scheme.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme-info',
  templateUrl: './scheme-info.component.html',
  styleUrls: ['./scheme-info.component.css']
})
export class SchemeInfoComponent implements OnInit {
  id!: string;
  schemeDetails!: Scheme;
  dataLoadingStatus: boolean = true;
  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
    this.schemeService.getSchemeById(this.id).subscribe(resp => {
      this.schemeDetails = resp;
      this.dataLoadingStatus = false;
    }, error => {
      console.log(error);
    }
    )
  }

}
