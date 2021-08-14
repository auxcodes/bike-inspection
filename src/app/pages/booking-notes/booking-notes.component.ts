import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-notes',
  templateUrl: './booking-notes.component.html',
  styleUrls: ['./booking-notes.component.scss']
})
export class BookingNotesComponent implements OnInit {

  @Input() notesInput = '';
  @Output() showCosts = new EventEmitter<boolean>();

  showCost = true;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleCost() {
    this.showCost = !this.showCost;
    this.showCosts.emit(this.showCost);
  }

}
