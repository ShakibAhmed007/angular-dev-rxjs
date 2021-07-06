import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrls: ['./observable-example.component.css']
})
export class ObservableExampleComponent implements OnInit, OnDestroy {
  private obsSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  basicObservable() {
    const obs = new Observable(subscriber => {
      let count = 0;
      try {
        setInterval(() => {
          subscriber.next(count);
          count++;
        }, 1000);
      } catch (err) {
        subscriber.next('error occured ');
      }
    });

    console.log('just before subscribe');
    this.obsSubscription = obs.subscribe({
      next(x) {
        console.log(x);
      },
      error(x) {
        console.log(x);
      },
      complete() {
        console.log('Done');
      }
    });
    console.log('just after subscribe');
  }

  ngOnDestroy() {
    // Unsubscribe an observable, ngOnDestroy
    this.obsSubscription.unsubscribe();
  }
}
