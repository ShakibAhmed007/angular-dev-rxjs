import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-example',
  templateUrl: './promise-example.component.html',
  styleUrls: ['./promise-example.component.css']
})
export class PromiseExampleComponent implements OnInit {
  x = 11;
  msg: any;

  constructor() {}

  ngOnInit() {
    let promise = new Promise((resolve, reject) => {
      if (this.x === 10) {
        resolve('Promise resolved !!!');
      } else {
        reject('Promise Rejected !!!');
      }
    });

    promise.then(
      res => {
        this.msg = res;
      },
      error => {
        this.msg = error;
      }
    );
  }
}
