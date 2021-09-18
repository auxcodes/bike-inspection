import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CloudStorageService } from '../../services/cloud-storage.service';
import { FieldsService } from '../../services/fields.service';
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

  constructor(private authService: AuthService, private csService: CloudStorageService, private fieldService: FieldsService) { }

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

  onBookingSelect(eventTarget: any) {
    this.fieldService.loadBooking(eventTarget.id);
    this.onClose();
  }

  onClose() {
    this.csService.showBookingHistory.next(false);
  }

  onLogout() {
    this.authService.logout();
    this.csService.showBookingHistory.next(false);
    this.fieldService.checkStorage();
  }

}
