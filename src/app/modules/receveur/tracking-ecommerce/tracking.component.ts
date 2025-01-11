import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  providers : [MessageService]
})
export class TrackingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
