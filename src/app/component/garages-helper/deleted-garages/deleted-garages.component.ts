import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-deleted-garages',
  templateUrl: './deleted-garages.component.html',
  styleUrls: ['./deleted-garages.component.css']
})
export class DeletedGaragesComponent implements OnInit {
  @Input() deactivatedGarages!: Garage[];
  @Input() loading!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onClick(id: string) {
    this.router.navigate(['/garages/' + id]);
  }

}
