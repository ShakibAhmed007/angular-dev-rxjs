import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { combineLatest } from 'rxjs';
import { concat } from 'rxjs';
import { timer } from 'rxjs';
import { forkJoin } from 'rxjs';
import { merge } from 'rxjs';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinct,
  distinctUntilChanged,
  filter,
  first,
last
} from 'rxjs/operators';
import {
  concatMap,
  debounce,
  delay,
  endWith,
  groupBy,
  map,
  mapTo,
  mergeMap,
  startWith,
  take,
  toArray
} from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-operator-example',
  templateUrl: './operator-example.component.html',
  styleUrls: ['./operator-example.component.css']
})
export class OperatorExampleComponent implements OnInit, AfterViewInit {
  private obs = interval(1000);
  private obsSubscription: Subscription;

  constructor(private service: DataService) {}

  ngOnInit() {}

  ngAfterViewInit() {}

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

  // section combine
  combineLatestExample() {
    const a = [1, 3, 5, 7];
    const b = [2, 4, 6, 8];
    const ab = combineLatest([a, b]).subscribe(res => {
      // console.log(res);
    });

    // using timer
    const timer1 = timer(0, 5000);
    const timer2 = timer(500, 10000);
    const timerObs = combineLatest([timer1, timer2])
      .pipe(map((t1, t2) => 'timer 1: ' + t1 + ' , timer 2 : ' + t2))
      .subscribe(res => {
        console.log(res);
      });
  }

  // section concat
  // study doc
  // https://rxjs.dev/api/index/function/concat
  //https://www.learnrxjs.io/learn-rxjs/operators/transformation/concatmap

  concatExample() {
    const t1 = interval(2000).pipe(
      take(4),
      mapTo('First !!!')
    );
    const t2 = interval(4000).pipe(
      take(2),
      mapTo('Second !!!')
    );
    const c = concat(t1, t2).subscribe(res => {
      console.log(res);
    });
  }

  concatMapExample() {
    const user = this.service.getUser().pipe(delay(10000));
    user
      .pipe(
        concatMap(res1 => {
          console.log('First Response --->>>', JSON.stringify(res1));
          // get second response based on first response
          return this.service.getAddress().pipe(delay(500));
        })
      )
      .pipe(
        concatMap(res2 => {
          console.log('Second Response --->>>', JSON.stringify(res2));
          // get third response based on second response
          return this.service.getJobInfo().pipe(delay(10000));
        })
      )
      .subscribe(res3 => {
        console.log('Third Respone --->>>', JSON.stringify(res3));
      });
  }

  // section forkjoin
  // Study doc
  // https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin

  forkJoinExample() {
    // Basic example
    const t1 = interval(1000).pipe(take(5));
    const t2 = interval(2000).pipe(take(3));
    const t3 = interval(3000).pipe(take(2));
    const c = forkJoin([t1, t2, t3])
      .pipe(
        map(
          res => 'Round: ' + res[0] + ' Round: ' + res[1] + ' Round : ' + res[2]
        )
      )
      .subscribe(res => {
        console.log('Data will print after all observable complete --->>> ');
        console.log(res);
      });

    // Example
    // Added delay to see actual behavior of http request

    const user = this.service.getUser().pipe(delay(1000));
    const address = this.service.getAddress().pipe(delay(10000));
    forkJoin([user, address]).subscribe(res => {
      console.log('User --->>>', JSON.stringify(res[0]));
      console.log('Address --->>>', JSON.stringify(res[1]));
    });
  }

  // section merge
  // study doc
  // https://rxjs.dev/api/operators/mergeMap
  // https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergemap
  // https://indepth.dev/reference/rxjs/operators/merge-map

  mergeExample() {
    const f1 = interval(1000).pipe(
      take(2),
      mapTo('FirstTO!!!')
    );

    const f2 = interval(2000).pipe(
      take(2),
      mapTo('SecondTO!!!')
    );

    merge(f1, f2).subscribe(res => {
      console.log(res);
    });
  }

  mergeMapExample() {
    const user = this.service.getUser().pipe(delay(10000));
    user
      .pipe(
        mergeMap(res1 => {
          console.log('First Response --->>>', JSON.stringify(res1));
          // get second response based on first response
          return this.service.getAddress().pipe(delay(500));
        })
      )
      .pipe(
        mergeMap(res2 => {
          console.log('Second Response --->>>', JSON.stringify(res2));
          // get third response based on second response
          return this.service.getJobInfo().pipe(delay(10000));
        })
      )
      .subscribe(res3 => {
        console.log('Third Respone --->>>', JSON.stringify(res3));
      });
  }

  // start and end with
  endWithExample() {
    const source$ = of('Hello', 'Friend', 'Goodbye');
    source$.pipe(endWith('Friend')).subscribe(val => console.log(val));
  }

  startWithExample() {
    const source$ = of('Hello', 'Friend', 'Goodbye');
    source$.pipe(startWith('Friend')).subscribe(val => console.log(val));
  }

  groupByExample() {
    const people = [
      { name: 'Sue', age: 25 },
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 25 },
      { name: 'Sarah', age: 35 }
    ];
    //emit each person
    const source = from(people);
    const example = source.pipe(
      groupBy(person => person['age']),
      mergeMap(group => group.pipe(toArray()))
    );
    const subscribe = example.subscribe(val =>
      console.log(JSON.stringify(val))
    );
  }

  // section debounce
  debounceExample() {
    //emit four strings
    const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
    const debouncedExample = example.pipe(debounce(() => timer(1000)));
    const subscribe = debouncedExample.subscribe(val => console.log(val));
  }

  debounceTimeExample() {
    const searchBox = document.getElementById('search');
    console.log(searchBox);
    const keyup$ = fromEvent(searchBox, 'keyup');
    // wait .5s between keyups to emit current value
    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500)
      )
      .subscribe(res => console.log(res));
  }

  // section distinct
  distinctExample() {
    // example 1
    const example = of(1, 2, 3, 4, 5, 1, 2, 3, 6, 7, 1, 2, 3, 8, 9);
    example.pipe(distinct()).subscribe(res => {
      console.log('res ---- >>>', res);
    });

    // example 2
    const obj1 = { id: 3, name: 'name 1' };
    const obj2 = { id: 4, name: 'name 2' };
    const obj3 = { id: 3, name: 'name 3' };
    const vals = [obj1, obj2, obj3];
    from(vals)
      .pipe(distinct(e => e['id']))
      .subscribe(res => console.log(res));
  }

  distinctUntilChangeExample() {
    const searchBox = document.getElementById('search1');
    console.log(searchBox);
    const keyup$ = fromEvent(searchBox, 'keyup');
    // wait .5s between keyups to emit current value
    // apply distinct until changed
    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(res => console.log(res));
  }

  // section filter
  filterExample() {
    // example 1
    const data = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
    data.pipe(filter(d => d > 5)).subscribe(res => {
      console.log(res);
    });

    // example 2
    const source = from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }]);
    const example = source.pipe(filter(person => person['age'] >= 30));
    const subscribe = example.subscribe(val =>
      console.log(`Over 30: ${val.name}`)
    );
  }

  firstExample() {
    const source = from([1, 2, 3, 4, 5, 5, 5]);
    const example = source.pipe(first(num => num > 3));
    const subscribe = example.subscribe(val =>
      console.log(`First to pass test: ${val}`)
    );
  }

  lastExample() {
    const source = from([1, 2, 3, 4, 5, 5, 5]);
    const example = source.pipe(last(num => num > 3));
    const subscribe = example.subscribe(val =>
      console.log(`First to pass test: ${val}`)
    );
  }

  // differenr mergemap , concatmap
  // https://thinkrx.io/rxjs/mergeMap-vs-exhaustMap-vs-switchMap-vs-concatMap/
}
