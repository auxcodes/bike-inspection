import { Component } from '@angular/core';
import { JsonField } from './shared/interfaces/json-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bike-inspection';
  output = '';

  brakeFields: JsonField[] = [
    { name: 'pads', text: 'Pads', selected: false, id: '$pads', value: 'pads' },
    { name: 'lever', text: 'Lever Feel', selected: false, id: '$lever', value: 'lever' },
    { name: 'bleed', text: 'Bleed', selected: false, id: '$bleed', value: 'bleed' }
  ]

  onFieldChange(field: any) {
    console.log("field: ", field.value);
    this.output = field.value;
  }
}
