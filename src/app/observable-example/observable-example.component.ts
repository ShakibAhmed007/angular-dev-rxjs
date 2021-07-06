import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrls: ['./observable-example.component.css']
})
export class ObservableExampleComponent implements OnInit {
  private obsSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  basicObservable() {
    const obs = new Observable(subscriber => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);
        if (count === 5) {
          subscriber.complete();
        }
        if (count >= 4) {
          subscriber.error(new Error('Error Occured'));
        }
        count++;
      }, 1000);
    });

    console.log('just before subscribe');
    this.obsSubscription = obs.subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Completed !!!');
      }
    );
    console.log('just after subscribe');
  }

  unSubscribe() {
    this.obsSubscription.unsubscribe();
  }
}
