import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {

  @Input() customers!: Customer[];
  @Input() loading!: boolean

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(id: string) {
    this.router.navigate(['/customers/' + id]);
  }

}
