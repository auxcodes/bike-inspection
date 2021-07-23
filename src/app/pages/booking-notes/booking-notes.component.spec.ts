import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNotesComponent } from './booking-notes.component';

describe('BookingNotesComponent', () => {
  let component: BookingNotesComponent;
  let fixture: ComponentFixture<BookingNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
