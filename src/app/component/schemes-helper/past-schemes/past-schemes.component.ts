import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(id: string) {
    this.router.navigate(['/schemes/' + id]);
  }

}
