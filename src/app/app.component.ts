import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oilwale';

  constructor(public router: Router) {
    // console.log(this.router.url + " Router")
    console.log("App Component")
  }
}
