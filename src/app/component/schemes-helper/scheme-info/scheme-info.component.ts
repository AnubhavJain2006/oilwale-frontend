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

  id!: string;
  schemeDetails!:Scheme;
  dataLoadingStatus:boolean = true;


  constructor(private router: ActivatedRoute, private schemeService: SchemeService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;

    this.schemeService.getSchemeById(this.id).subscribe(data => {
      this.schemeDetails = data;
      this.dataLoadingStatus = false;
    })

  }

}
