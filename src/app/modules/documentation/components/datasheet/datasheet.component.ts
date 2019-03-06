import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datasheet',
  templateUrl: './datasheet.component.html',
  styleUrls: ['./datasheet.component.css']
})
export class DatasheetComponent implements OnInit {

  nav: string = 'ng-datasheet';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['nav']) {
        this.nav = params['nav'];
      } else {
        this.nav = 'ng-datasheet';
      }

    });
  }

}
