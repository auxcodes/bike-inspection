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
    },
    {
      groupId: 'wheels',
      groupLabel: 'Wheels',
      fields:
        [
          { name: 'tyres', text: 'Tyres', selected: false, id: '$tyres', value: 'tyres' },
          { name: 'spokes', text: 'Spokes', selected: false, id: '$spokes', value: 'spokes' },
          { name: 'true', text: 'True', selected: false, id: '$true', value: 'true' },
          { name: 'hubAdjust', text: 'Hub Adjust', selected: false, id: '$hubAdjust', value: 'hubAdjust' }
        ]
    },
    {
      groupId: 'bearings',
      groupLabel: 'Bearings',
      fields:
        [
          { name: 'hubs', text: 'Hubs', selected: false, id: '$hubs', value: 'hubs' },
          { name: 'headset', text: 'Headset', selected: false, id: '$headset', value: 'headset' },
          { name: 'bottomBracket', text: 'Bottom Bracket', selected: false, id: '$bottomBracket', value: 'bottomBracket' }
        ]
    },
    {
      groupId: 'driveTrain',
      groupLabel: 'Drive Train',
      fields:
        [
          { name: 'chain', text: 'Chain', selected: false, id: '$chain', value: 'chain' },
          { name: 'cassette', text: 'Cassette', selected: false, id: '$cassette', value: 'cassette' },
          { name: 'chainrings', text: 'Chainrings', selected: false, id: '$chainrings', value: 'chainrings' },
          { name: 'cranks', text: 'Cranks', selected: false, id: '$cranks', value: 'cranks' },
          { name: 'shifters', text: 'hifters', selected: false, id: '$shifters', value: 'shifters' },
          { name: 'derailleur', text: 'Derailleur', selected: false, id: '$derailleur', value: 'derailleur' }
        ]
    },
    {
      groupId: 'cables',
      groupLabel: 'Cables',
      fields:
        [
          { name: 'gear', text: 'Gear', selected: false, id: '$gear', value: 'gear' },
          { name: 'brake', text: 'Brake', selected: false, id: '$brake', value: 'brake' },
          { name: 'dropper', text: 'dropper', selected: false, id: '$dropper', value: 'dropper' }
        ]
    },
    {
      groupId: 'contactPoints',
      groupLabel: 'Contact Points',
      fields:
        [
          { name: 'grips', text: 'Grips', selected: false, id: '$grips', value: 'grips' },
          { name: 'bartape', text: 'Bar Tape', selected: false, id: '$bartape', value: 'bartape' },
          { name: 'saddle', text: 'Saddle', selected: false, id: '$saddle', value: 'saddle' },
          { name: 'pedals', text: 'Pedals', selected: false, id: '$pedals', value: 'pedals' }
        ]
    },
  ]

  onFieldChange(field: any) {
    console.log("field: ", field.value);
    //this.output = this.output + ' \n - ' + this.fieldsJson[groupId['']fields[field.id['text']]] + ': ' + field.value;
  }
}
