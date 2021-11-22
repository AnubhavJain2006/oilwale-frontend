import { Component, OnInit, Input } from '@angular/core';

import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-deleted-garages',
  templateUrl: './deleted-garages.component.html',
  styleUrls: ['./deleted-garages.component.css']
})
export class DeletedGaragesComponent implements OnInit {
  @Input() deactivatedGarages!: Garage[];

  constructor() { }

  ngOnInit(): void {
  }

}
