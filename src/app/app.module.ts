import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BodyComponent } from './pages/body/body.component';
import { BookingNotesComponent } from './pages/booking-notes/booking-notes.component';
import { TabHeaderComponent } from './shared/components/tab-header/tab-header.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BookingHistoryComponent } from './pages/booking-history/booking-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    BookingNotesComponent,
    TabHeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    BookingHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
