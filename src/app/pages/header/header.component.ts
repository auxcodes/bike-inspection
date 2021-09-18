import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CloudStorageService } from '../../services/cloud-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private csService: CloudStorageService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onProfile() {
    this.csService.bookingHistory.next(true);
  }

  onLogout() {
    this.authService.logout();
    this.csService.bookingHistory.next(false);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
