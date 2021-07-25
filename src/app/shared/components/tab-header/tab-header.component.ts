import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss']
})
export class TabHeaderComponent implements OnInit {

  selected = 'inspection';
  @Output() bookingNotes = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(selection: string) {
    this.selected = selection;
    this.bookingNotes.emit(selection === 'booking');
  }

}
