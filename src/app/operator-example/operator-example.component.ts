import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operator-example',
  templateUrl: './operator-example.component.html',
  styleUrls: ['./operator-example.component.css']
})
export class OperatorExampleComponent implements OnInit {
  private obs = new Observable(subscriber => {
    setInterval(() => {
      subscriber.next(1);
    }, 1000);
  });
  private obsSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  subscribe() {
    this.obsSubscription = this.obs.subscribe(res => {
      console.log(res);
    });
  }

  unSubscribe() {
    this.obsSubscription.unsubscribe();
  }
}
