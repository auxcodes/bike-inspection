import { HttpClient, HttpParams } from '@angular/common/http';
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

  storageSize = 10;
  showBookingHistory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private bookings: JsonStorage[] = [];


  constructor(private http: HttpClient, private authService: AuthService) { }

  canSync() {
    return this.authService.user;
  }

  booking(position: number) {
    return this.bookings[position];
  }

  private addBooking(booking: JsonStorage) {
    // limit size of history,
    const bookingLength = this.bookings.length
    if (bookingLength > this.storageSize) {
      this.bookings.pop();
    }

    const ref = booking.reference;
    const index = this.bookings.findIndex(bk => bk.reference === booking.reference);
    if (index === -1 || ref === '') {
      this.bookings.push(booking);
    }
    else {
      this.bookings[index] = booking;
    }
  }

  pushBooking(booking: JsonStorage) {
    if (!this.authService.user.value) {
      return;
    }
    this.addBooking(booking);
    const userId = this.authService.user.value.id
    this.http
      .put(
        'https://bike-booker-default-rtdb.firebaseio.com/' + userId + '/bookings.json',
          this.bookings
      )
      .subscribe(response => {
        //console.log(response);
      });
  }

  pullBooking() {
    const user = this.authService.user.value
    return this.http
      .get<JsonStorage[]>(
        'https://bike-booker-default-rtdb.firebaseio.com/' + user.id + '/bookings.json',
        {
          params: new HttpParams().set('auth', user.token)
        }
      )
      .pipe(
        map(bookings => {
          return !bookings ? [] : bookings.map(booking => {
            return booking;
          });
        }),
        tap(bookings => {
          this.bookings = bookings.sort((b1, b2) => {
            return b2.dateTimeStamp - b1.dateTimeStamp;
          });
        })
      );
  }

}
