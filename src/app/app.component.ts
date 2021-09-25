import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CloudStorageService } from './services/cloud-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBookingHistory = false;

  constructor(private csService: CloudStorageService, private authService: AuthService) {
    authService.autoLogin();

    csService.showBookingHistory.subscribe(showHistory => {
      this.showBookingHistory = showHistory;
    });
  }
}
