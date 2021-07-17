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
          { name: 'pads', text: 'Pads', selected: false, id: '$pads', value: 'Okay' },
          { name: 'lever', text: 'Lever Feel', selected: false, id: '$lever', value: 'Okay' },
          { name: 'bleed', text: 'Bleed', selected: false, id: '$bleed', value: 'Okay' }
        ]
    },
    {
      groupId: 'wheels',
      groupLabel: 'Wheels',
      fields:
        [
          { name: 'tyres', text: 'Tyres', selected: false, id: '$tyres', value: 'Okay' },
          { name: 'spokes', text: 'Spokes', selected: false, id: '$spokes', value: 'Okay' },
          { name: 'true', text: 'True', selected: false, id: '$true', value: 'Okay' },
          { name: 'hubAdjust', text: 'Hub Adjust', selected: false, id: '$hubAdjust', value: 'Okay' }
        ]
    },
    {
      groupId: 'bearings',
      groupLabel: 'Bearings',
      fields:
        [
          { name: 'hubs', text: 'Hubs', selected: false, id: '$hubs', value: 'Okay' },
          { name: 'headset', text: 'Headset', selected: false, id: '$headset', value: 'Okay' },
          { name: 'bottomBracket', text: 'Bottom Bracket', selected: false, id: '$bottomBracket', value: 'Okay' }
        ]
    },
    {
      groupId: 'driveTrain',
      groupLabel: 'Drive Train',
      fields:
        [
          { name: 'chain', text: 'Chain', selected: false, id: '$chain', value: 'Okay' },
          { name: 'cassette', text: 'Cassette', selected: false, id: '$cassette', value: 'Okay' },
          { name: 'chainrings', text: 'Chainrings', selected: false, id: '$chainrings', value: 'Okay' },
          { name: 'cranks', text: 'Cranks', selected: false, id: '$cranks', value: 'Okay' },
          { name: 'shifters', text: 'hifters', selected: false, id: '$shifters', value: 'Okay' },
          { name: 'derailleur', text: 'Derailleur', selected: false, id: '$derailleur', value: 'Okay' }
        ]
    },
    {
      groupId: 'cables',
      groupLabel: 'Cables',
      fields:
        [
          { name: 'gear', text: 'Gear', selected: false, id: '$gear', value: 'Okay' },
          { name: 'brake', text: 'Brake', selected: false, id: '$brake', value: 'Okay' },
          { name: 'dropper', text: 'dropper', selected: false, id: '$dropper', value: 'Okay' }
        ]
    },
    {
      groupId: 'contactPoints',
      groupLabel: 'Contact Points',
      fields:
        [
          { name: 'grips', text: 'Grips', selected: false, id: '$grips', value: 'Okay' },
          { name: 'bartape', text: 'Bar Tape', selected: false, id: '$bartape', value: 'Okay' },
          { name: 'saddle', text: 'Saddle', selected: false, id: '$saddle', value: 'Okay' },
          { name: 'pedals', text: 'Pedals', selected: false, id: '$pedals', value: 'Okay' }
        ]
    },
  ]

  onFieldChange(groupId: number, field: any) {
    const index = this.fieldsJson[groupId].fields.findIndex(jsonField => field.id === jsonField.id);
    const selected: boolean = field.value;
    this.fieldsJson[groupId].fields[index].selected = selected;

    if (selected) {
      this.fieldsJson[groupId].fields[index].value = field.value;
      this.updateOutput();
    }

  }

  onFieldSelected(groupId: number, field: any) {
    const index = this.fieldsJson[groupId].fields.findIndex(jsonField => field.id === jsonField.name);
    this.fieldsJson[groupId].fields[index].selected = field.checked;

    this.updateOutput();
  }

  private updateOutput() {
    this.output = 'Inspection Notes:';
    this.fieldsJson.forEach(group => {
      let fieldsText: string = '';
      group.fields.forEach(field => {
        if (field.selected) {
          fieldsText = fieldsText + ' \n - ' + field.text + ': ' + field.value;
        }
      });
      if (fieldsText) {
        this.output = this.output + ' \n' + group.groupLabel;
        this.output = this.output + fieldsText;
      }
    });
  }
}
