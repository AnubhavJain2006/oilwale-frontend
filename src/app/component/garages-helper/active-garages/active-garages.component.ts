import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-active-garages',
  templateUrl: './active-garages.component.html',
  styleUrls: ['./active-garages.component.css']
})
export class ActiveGaragesComponent implements OnInit {
  @Input() garages!: Garage[];
  @Input() loading!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onClick(id: string) {
    this.router.navigate(['/garages/' + id]);
  }


}
