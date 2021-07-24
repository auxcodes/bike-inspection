import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss']
})
export class TabHeaderComponent implements OnInit {

  selected = 'inspection';

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(selection: string) {
    console.log(selection);
    this.selected = selection;
  }

}
