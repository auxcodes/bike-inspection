import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CloudStorageService } from '../../services/cloud-storage.service';
import { JsonStorage } from '../../shared/interfaces/json-storage';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit, OnDestroy {

  private bookingsSub: Subscription;
  canView = false;
  bookings: JsonStorage[] = [];

  constructor(private csService: CloudStorageService) { }

  ngOnInit(): void {
    this.csService.canSync().subscribe(user => {
      if (user) {
        this.canView = true;
      }
    });

    if (this.canView) {
      this.bookingsSub = this.csService.pullBooking().subscribe(bookings => {
        if (bookings) {
          this.bookings = bookings;
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  onClose() {
    this.csService.bookingHistory.next(false);
  }

}
