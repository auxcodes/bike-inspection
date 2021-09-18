import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonStorage } from '../shared/interfaces/json-storage';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  bookings: JsonStorage[] = [];
  storageSize = 10;
  bookingHistory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) { }

  canSync() {
    return this.authService.user;
  }

  pushBooking(booking: JsonStorage) {
    this.bookings.push(booking);
    if (this.bookings.length > this.storageSize) {
      this.bookings.pop();
    }
    // limit size of history, 
    this.http
      .put(
        'https://bike-booker-default-rtdb.firebaseio.com/bookings.json',
        this.bookings
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  pullBooking() {
    console.log('pull bookings');
    return this.http
      .get<JsonStorage[]>(
        'https://bike-booker-default-rtdb.firebaseio.com/bookings.json'
      )
      .pipe(
        map(bookings => {
          console.log('map bookings: ',bookings);

          return bookings.map(booking => {
            return booking;
          });
        }),
        tap(bookings => {
          console.log('pull bookings: ', bookings);
          this.bookings = bookings;
        })
      );
  }

}
