import { Component, OnInit } from '@angular/core';
import { BroadcastService } from 'src/app/service/broadcast.service';

import { Broadcast } from 'src/app/interface/broadcast';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-broadcasts',
  templateUrl: './broadcasts.component.html',
  styleUrls: ['./broadcasts.component.css']
})
export class BroadcastsComponent implements OnInit {

  broadcasts: Broadcast[] = [];
  broadcastForm: FormGroup;

  // form variables
  targetGroupArray: string[] = [];

  // flags
  broadcastLoadingFlag: boolean = true;
  targetGroupFormTouched: boolean = false;
  broadcastAddSuccessFlag: boolean = false;
  broadcastAddLoadingFLag: boolean = false;

  constructor(private broadcastService: BroadcastService) { 
    this.broadcastForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.fetchBroadcasts();
  }

  fetchBroadcasts() {
    this.broadcastLoadingFlag = true;
    this.broadcastService.fetchBroadcasts().subscribe(data => {
      this.broadcasts = data;
      console.log(data);
      this.broadcastLoadingFlag = false;
    },
    err => {
      console.error(err);
    },
    () => {
      this.broadcastAddSuccessFlag = false;
    })
  }

  addBroadcast() {
    console.log(this.broadcastForm.value);
    console.log(this.targetGroupArray);

    this.targetGroupArray.sort();

    // 61934169b7c80c2097bf3617
    let newBroadcastObj: Broadcast = {
      broadCastId: "",
      title: this.broadcastForm.value.title,
      description: this.broadcastForm.value.description,
      targetGroup: this.targetGroupArray,
      createdAt: new Date(),
      modifiedAt: new Date(),
      createdBy: "malvik"
    }

    this.broadcastAddLoadingFLag = true;
    this.broadcastService.addBroadcast(newBroadcastObj).subscribe(data => {
      console.log(data);
      this.broadcastAddSuccessFlag = true;
      this.broadcastAddLoadingFLag = false;
      this.fetchBroadcasts();

      this.broadcastForm.reset();

      document.getElementById('modalClosebtn')?.click();
    })
    
    
  }

  targetGroupPush(group: string) {
    this.targetGroupFormTouched = true;
    let index = this.targetGroupArray.indexOf(group);

    if (index == -1) {
      this.targetGroupArray.push(group);
    }
    else {
      this.targetGroupArray.splice(index, 1);
    }
  }

}
