import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { combineLatest } from 'rxjs';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-operator-example',
  templateUrl: './operator-example.component.html',
  styleUrls: ['./operator-example.component.css']
})
export class OperatorExampleComponent implements OnInit {
  private obs = interval(1000);
  private obsSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  subscribe() {
    this.obsSubscription = this.obs
      .pipe(
        take(2),
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

  combineLatestExample() {
    const a = [1, 3, 5, 7];
    const b = [2, 4, 6, 8];
    const ab = combineLatest([a, b]).subscribe(res => {
      console.log(res);
    });

    // using timer
    const timer1 = timer(0, 1000);
    const timer2 = timer(500, 100);
    const timerObs = combineLatest([timer1, timer2]).subscribe(res => {
      console.log(res);
    });
  }
}
