import { Component } from '@angular/core';
import { JsonField } from './shared/interfaces/json-field';
import { JsonGroup } from './shared/interfaces/json-group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bike-inspection';
  output = 'Inspection Notes:';

  fieldsJson: JsonGroup[] = [
    {
      groupId: 'brakes',
      groupLabel: 'Brakes',
      fields:
        [
          { name: 'pads', text: 'Pads', selected: false, id: '$pads', value: 'pads' },
          { name: 'lever', text: 'Lever Feel', selected: false, id: '$lever', value: 'lever' },
          { name: 'bleed', text: 'Bleed', selected: false, id: '$bleed', value: 'bleed' }
        ]
    }
  ]

  onFieldChange(field: any) {
    console.log("field: ", field.value);
    //this.output = this.output + ' \n - ' + this.fieldsJson[groupId['']fields[field.id['text']]] + ': ' + field.value;
  }
}
