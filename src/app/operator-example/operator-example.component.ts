import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-operator-example',
  templateUrl: './operator-example.component.html',
  styleUrls: ['./operator-example.component.css']
})
export class OperatorExampleComponent implements OnInit {
  private obs = new Observable(subscriber => {
    let count = 0;
    setInterval(() => {
      subscriber.next(count);
      count++;
    }, 1000);
  });
  private obsSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  subscribe() {
    this.obsSubscription = this.obs
      .pipe(
        map((x: number) => x * 5),
        map((x: number) => 'Round: ' + x)
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  unSubscribe() {
    this.obsSubscription.unsubscribe();
  }
}
