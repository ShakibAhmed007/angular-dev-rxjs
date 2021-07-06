import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrls: ['./observable-example.component.css']
})
export class ObservableExampleComponent implements OnInit {
  obs = new Observable(subscriber => {
    try {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      setTimeout(() => {
        subscriber.next(5); // this will not execute
      }, 1000);
      subscriber.complete();
    } catch (err) {
      subscriber.next('error occured ');
    }
  });

  constructor() {}

  ngOnInit() {}

  basicObservable() {
    console.log('just before subscribe');
    const subscription = this.obs.subscribe({
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
    
    // Unsubscribe an observable, ngOnDestroy
    // subscription.unsubscribe();
  }
}
