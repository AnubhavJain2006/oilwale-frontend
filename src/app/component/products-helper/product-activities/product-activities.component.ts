import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/interface/activity';

@Component({
  selector: 'app-product-activities',
  templateUrl: './product-activities.component.html',
  styleUrls: ['./product-activities.component.css']
})
export class ProductActivitiesComponent implements OnInit {

  @Input() activities!: Activity[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
