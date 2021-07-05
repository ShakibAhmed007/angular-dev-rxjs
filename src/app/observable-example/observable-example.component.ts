
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrls: ['./observable-example.component.css']
})
export class ObservableExampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);

      setTimeout(() => {
        subscriber.next(5);
      }, 1000);
    });

    observable.subscribe({
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
  }
}
