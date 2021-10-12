import { Scheme } from './../../interface/scheme';
import { SchemeService } from './../../service/scheme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {
  scheme: FormGroup;
  schemeList: any = "";
  isValidDates: any = "";
  isDataAvailable: boolean = false;

  constructor(private schemeService: SchemeService) {
    this.scheme = new FormGroup({
      schemeName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startedAt: new FormControl('', Validators.required),
      endedAt: new FormControl('', Validators.required)
    })

    this.loadSchemes("Active")
  }

  ngOnInit(): void {
  }

  async loadSchemes(str: string) {
    if (str == "Active") {
      await this.schemeService.loadAllActiveScheme().then((resp: any) => {
        console.log(resp);
        this.schemeList = resp;
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = "";
        console.log(err);
        if (err.error.text != "") {
          this.isDataAvailable = true;
        }
      });
    }
    else if (str == "Concluded") {
      await this.schemeService.loadAllConcludedScheme().then((resp: any) => {
        console.log(resp);
        this.schemeList = resp;
        // console.log(resp["error"])
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = "";
        console.log(err);
        if (err.error.text != "") {
          this.isDataAvailable = true;
        }
      });
    }
    else {
      await this.schemeService.loadAllUpComingScheme().then((resp: any) => {
        console.log(resp);
        this.schemeList = resp;
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = "";
        console.log(err);
        console.log("Error of err " + err.error.text)
        if (err.error.text != "") {
          this.isDataAvailable = true;
        }
      });
    }
  }

  onChange(schemeType: any) {
    let str: string = schemeType.target.value;
    console.log(str)
    this.loadSchemes(str);
  }

  addScheme() {
    console.log(this.scheme.value)
    this.schemeService.addNewScheme(this.scheme.value).subscribe(resp => {
      console.log(resp);
      this.scheme.reset();
    }, err => {
      console.log("Error in scheme add" + err)
    })

  }

  validateDate() {
    if (this.scheme.value.startedAt != '' && this.scheme.value.endedAt != '') {
      let sd: Date = this.scheme.value.startedAt;
      let ed: Date = this.scheme.value.endedAt;
      if (sd > ed) {
        this.isValidDates = true;
      }
      else {
        this.isValidDates = false;
      }
    }
  }
}
