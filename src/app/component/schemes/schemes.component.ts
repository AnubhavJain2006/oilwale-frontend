import { Scheme } from './../../interface/scheme';
import { SchemeService } from './../../service/scheme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SchemeInfo } from 'src/app/interface/scheme-info';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {
  // scheme: FormGroup;
  schemeList: SchemeInfo[] = [];
  isValidDates: any = "";
  isDataAvailable: boolean = false;

  activeSchemeList: SchemeInfo[] = [];
  upcomingSchemeList: SchemeInfo[] = [];
  pastSchemeList: SchemeInfo[] = [];

  constructor(private schemeService: SchemeService) {
    
    this.loadSchemes("Active")

    if (this.activeSchemeList.length == 0) {
      this.fetchActiveSchemes();
    }
    else {
      this.activeSchemeList = this.schemeService.activeSchemeList;
    }

    if (this.upcomingSchemeList.length == 0) {
      this.fetchUpcomingSchemes();
    }
    else {
      this.upcomingSchemeList = this.schemeService.upcomingSchemeList;
    }

    if (this.pastSchemeList.length == 0) {
      this.fetchPastSchemes();
    }
    else {
      this.pastSchemeList = this.schemeService.pastSchemeList;
    }
  }

  ngOnInit(): void {
    this.schemeService.refreshNeeded.subscribe(() => {
      this.fetchActiveSchemes();
      this.fetchUpcomingSchemes();
      this.fetchPastSchemes();
    })
  }

  async loadSchemes(str: string) {
    if (str == "Active") {
      await this.schemeService.loadAllActiveScheme().then((resp: any) => {
        //console.log(resp);
        this.schemeList = resp;
        this.isDataAvailable = false;
      }, err => {
        this.schemeList = [];
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
        this.schemeList = [];
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
        this.schemeList = [];
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

  async fetchActiveSchemes() {
    await this.schemeService.loadAllActiveScheme().then(data => {
      this.activeSchemeList = data;
      console.log(data);
      
    }, err => {
      console.log(err);
    })
    this.schemeService.activeSchemeList = this.activeSchemeList;
  }

  async fetchUpcomingSchemes() {
    await this.schemeService.loadAllUpComingScheme().then(data => {
      this.upcomingSchemeList = data;
      console.log(data);
    }, err => {
      console.log(err);
    })
    this.schemeService.upcomingSchemeList = this.upcomingSchemeList;
  }
  
  async fetchPastSchemes() {
    await this.schemeService.loadAllConcludedScheme().then(data => {
      this.pastSchemeList = data;
      console.log(data);
    }, err => {
      console.log(err);
    })
    this.schemeService.pastSchemeList = this.pastSchemeList;
  }


}
