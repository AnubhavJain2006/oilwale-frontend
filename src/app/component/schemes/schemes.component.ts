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
  // scheme: FormGroup;
  schemeList: any = "";
  isValidDates: any = "";
  isDataAvailable: boolean = false;

  constructor(private schemeService: SchemeService) {
    
    this.loadSchemes("Active")
  }

  ngOnInit(): void {
  }

  async loadSchemes(str: string) {
    if (str == "Active") {
      await this.schemeService.loadAllActiveScheme().then((resp: any) => {
        //console.log(resp);
        this.schemeList = resp;
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = "";
        //console.log(err);
        if (err.error.text != "") {
          this.isDataAvailable = true;
        }
      });
    }
    else if (str == "Concluded") {
      await this.schemeService.loadAllConcludedScheme().then((resp: any) => {
        //console.log(resp);
        this.schemeList = resp;
        // ////console.log(resp["error"])
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = "";
        // console.log(err);
        if (err.error.text != "") {
          this.isDataAvailable = true;
        }
      });
    }
    else {
      await this.schemeService.loadAllUpComingScheme().then((resp: any) => {
        //console.log(resp);
        this.schemeList = resp;
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = "";
        //console.log(err);
        //console.log("Error of err " + err.error.text)
        if (err.error.text != "") {
          this.isDataAvailable = true;
        }
      });
    }
  }

  onChange(schemeType: any) {
    let str: string = schemeType.target.value;
    //console.log(str)
    this.loadSchemes(str);
  }

  


}
