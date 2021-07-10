import { Injectable } from '@angular/core';
import { of } from 'rxjs/dist/types';
import { Observable } from 'rxjs/dist/types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getUser(): Observable<any> {
    const user = [
      {
        id: 1,
        name: 'Shakib',
        email: 's@gmail.com'
      },
      {
        id: 2,
        name: 'Shakib',
        email: 's@gmail.com'
      },
      {
        id: 3,
        name: 'Shakib',
        email: 's@gmail.com'
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
}
