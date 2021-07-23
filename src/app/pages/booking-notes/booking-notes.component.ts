import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-notes',
  templateUrl: './booking-notes.component.html',
  styleUrls: ['./booking-notes.component.scss']
})
export class BookingNotesComponent implements OnInit {

  @Input() notesInput = '';

  constructor() { }

  ngOnInit(): void {
  }

}
