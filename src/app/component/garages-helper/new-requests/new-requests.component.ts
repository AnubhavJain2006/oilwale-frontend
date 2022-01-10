import { Component, OnInit, Input } from '@angular/core';
import { NewGarageRequest } from 'src/app/interface/new-garage-request';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.css']
})
export class NewRequestsComponent implements OnInit {

  @Input() requests:NewGarageRequest[] = [];
  @Input() acceptedRequest: NewGarageRequest[] = [];
  @Input() loading: boolean = true;
  @Input() acceptedLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
