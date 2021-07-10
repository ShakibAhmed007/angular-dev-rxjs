import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getUser(): Observable<any> {
    const user = [
      {
        id: 1,
        name: 'Shakib',
        email: 's@gmail.com',
        age: 20
      },
      {
        id: 2,
        name: 'Shakib',
        email: 's@gmail.com',
        age: 22
      },
      {
        id: 3,
        name: 'Shakib',
        email: 's@gmail.com',
        age: 25
      },
      {
        id: 4,
        name: 'Shakib',
        email: 's@gmail.com',
        age: 25
      },
      {
        id: 5,
        name: 'Shakib',
        email: 's@gmail.com',
        age: 30
      }
    ];

    return of(user);
  }

  getAddress(): Observable<any> {
    const address = [
      {
        id: 1,
        city: 'Dhaka',
        country: 'Bangladesh'
      },
      {
        id: 2,
        city: 'Dhaka',
        country: 'Bangladesh'
      },
      {
        id: 3,
        city: 'Dhaka',
        country: 'Bangladesh'
      }
    ];

    return of(address);
  }

  getJobInfo(): Observable<any> {
    const address = [
      {
        id: 1,
        city: 'Dhaka',
        country: 'Bangladesh'
      },
      {
        id: 2,
        city: 'Dhaka',
        country: 'Bangladesh'
      },
      {
        id: 3,
        city: 'Dhaka',
        country: 'Bangladesh'
      }
    ];

    return of(address);
  }
}
