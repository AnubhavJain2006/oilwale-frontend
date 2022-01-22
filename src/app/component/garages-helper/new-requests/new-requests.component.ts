import { Component, OnInit, Input } from '@angular/core';
import { NewGarageRequest } from 'src/app/interface/new-garage-request';
import { GarageService } from 'src/app/service/garage.service';

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


  // modal variables
  methodCall: string = "";
  requestOfIntrest!: NewGarageRequest;

  // flags
  refreshingApproveReqFlag: boolean = false;
  refreshingDeclineReqFlag: boolean = false;
  approveReqFlag: boolean = false;
  declineReqFlag: boolean = false;


  constructor(private garageService: GarageService) { }

  ngOnInit(): void {
  }

  requestConfirmation(request: NewGarageRequest, method: string) {
    this.methodCall = method;
    this.requestOfIntrest = request;
  }

  approveRequest(req: NewGarageRequest) {
    this.approveReqFlag = true
    this.garageService.acceptNewRequest(req).subscribe(data => {
      this.approveReqFlag = false;

      setTimeout(() => {
        document.getElementById('confirmationModalCloseBtn')?.click();
      }, 1000);

      this.refreshPendingRequests();
      this.refreshApprovedRequests();
    })
  }


  declineRequest(req: NewGarageRequest) {
    this.declineReqFlag = true
    this.garageService.declineNewRequest(req).subscribe(data => {
      this.declineReqFlag = false;

      setTimeout(() => {
        document.getElementById('confirmationModalCloseBtn')?.click();
      }, 1000);

      this.refreshPendingRequests();
    })
  }


  refreshPendingRequests() {
    this.refreshingApproveReqFlag = true;
    this.garageService.fetchNewRequests().subscribe(data => {
      this.refreshingApproveReqFlag = false;
      this.requests = data;
    },
    error => {
      console.log(error);
      alert("Error while fetching request!")
      this.refreshingApproveReqFlag = false;

    })
  }

  refreshApprovedRequests() {
    this.refreshingDeclineReqFlag = true;
    this.garageService.fetchAcceptedRequests().subscribe(data => {
      this.acceptedRequest = data;
      this.refreshingDeclineReqFlag = false;
    },
    error => {
      alert("Error while fetching Approved requests!")
      console.log(error);
      this.refreshingDeclineReqFlag = false;
    })
  }

}
