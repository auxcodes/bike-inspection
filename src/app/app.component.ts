import { Component } from '@angular/core';
import { CloudStorageService } from './services/cloud-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBookingHistory = false;

  constructor(private csService: CloudStorageService) {
    csService.bookingHistory.subscribe(showHistory => {
      this.showBookingHistory = showHistory;
    });
  }
}
