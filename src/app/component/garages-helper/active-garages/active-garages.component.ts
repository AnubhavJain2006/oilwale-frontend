import { Component, OnInit, Input } from '@angular/core';

import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-active-garages',
  templateUrl: './active-garages.component.html',
  styleUrls: ['./active-garages.component.css']
})
export class ActiveGaragesComponent implements OnInit {
  @Input() garages!: Garage[];

  constructor() { }

  ngOnInit(): void {
  }

}
