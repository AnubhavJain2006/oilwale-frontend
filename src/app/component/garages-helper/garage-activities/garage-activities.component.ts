import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/interface/activity';

@Component({
  selector: 'app-garage-activities',
  templateUrl: './garage-activities.component.html',
  styleUrls: ['./garage-activities.component.css']
})
export class GarageActivitiesComponent implements OnInit {
  @Input() activities!:Activity[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
