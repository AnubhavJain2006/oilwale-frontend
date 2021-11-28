import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/interface/activity';

@Component({
  selector: 'app-customer-activities',
  templateUrl: './customer-activities.component.html',
  styleUrls: ['./customer-activities.component.css']
})
export class CustomerActivitiesComponent implements OnInit {

  @Input() activities!:Activity[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
