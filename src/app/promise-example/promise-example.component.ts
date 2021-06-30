import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-example',
  templateUrl: './promise-example.component.html',
  styleUrls: ['./promise-example.component.css']
})
export class PromiseExampleComponent implements OnInit {
  x = 10;
  msg: any;

  constructor() {}

  ngOnInit() {}

  getPromiseData() {
    return new Promise((resolve, reject) => {
      if (this.x === 11) {
        resolve('Promise resolved !!!');
      } else {
        reject('Promise Rejected !!!');
      }
    });
  }

  getPromise() {
    this.getPromiseData().then(
      res => {
        this.msg = res;
      },
      error => {
        this.msg = error;
      }
    );
  }

  getPromiseWithChaining() {
    this.getPromiseData()
      .then(res => {
        return res + ' With chaining 1 !!!';
      })
      .then(res => {
        return res + ' With chaining 2 !!!';
      })
      .then(res => {
        this.msg = res;
        console.log(res);
      })
      .catch(error => {
        this.msg = error;
      });
  }
}
