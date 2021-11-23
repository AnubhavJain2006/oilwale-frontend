import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {

  @Input() customers!: Customer[];
  @Input() loading!: boolean

  constructor() { }

  ngOnInit(): void {
  }

}
