import { Component, OnInit, Input } from '@angular/core';
import { Scheme } from 'src/app/interface/scheme';
import { SchemeInfo } from 'src/app/interface/scheme-info';

@Component({
  selector: 'app-past-schemes',
  templateUrl: './past-schemes.component.html',
  styleUrls: ['./past-schemes.component.css']
})
export class PastSchemesComponent implements OnInit {

  @Input() schemes!:SchemeInfo[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
