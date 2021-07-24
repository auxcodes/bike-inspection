import { Component, HostListener, OnInit } from '@angular/core';
import { JsonField } from '../../shared/interfaces/json-field';
import { JsonGroup } from '../../shared/interfaces/json-group';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  title = 'bike-inspection';
  output = '';
  notesTitle = 'Inspection:'
  extraNotes = '';
  totalCost = 0;
  prices: { id: string; cost: number }[] = []

  screenWidth = 1500;
  showBookingNotes = true;


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

  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1000) {
      this.showBookingNotes = false;
    }
  }

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

  onSelectAll(groupId: number, checkBox: any) {
    this.fieldsJson[groupId].fields.forEach((field: JsonField) => {
      field.selected = checkBox.checked;
    });
    this.updateOutput();
  }

  onOtherNotes(field: any) {
    this.extraNotes = '\n\n' + 'Notes: \n' + field.value;
    this.updateOutput();
  }

  onCostChange(field: any) {
    const index = this.priceIndex(field.id);
    this.totalCost = 0;
    if (index === -1) {
      this.prices.push({ id: field.id, cost: field.value === '' ? 0 : field.value });
    }
    else {
      this.prices[index].cost = field.value;
    }

    this.prices.forEach(price => {
      this.totalCost = this.totalCost + +price.cost;
    });
    this.updateOutput();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.screenWidth = window.innerWidth;
    this.showBookingNotes = this.screenWidth < 1000 ? false : true;

  }

  private priceIndex(id: string) {
    return this.prices.findIndex(cost => cost.id === id);
  }

  private updateOutput() {
    this.output = this.notesTitle;
    this.fieldsJson.forEach(group => {
      let fieldsText = '';
      group.fields.forEach((field: JsonField) => {
        if (field.selected) {
          const index = this.priceIndex(field.name + '-cost');
          const cost = index > -1 ? this.prices[index].cost : 0;
          fieldsText = fieldsText + ' \n - ' + field.text + ': ' + field.value + (cost > 0 ? ' - $' + Number(cost).toFixed(2) : '') ;
        }
      });
      if (fieldsText) {
        this.output = this.output + ' \n' + group.groupLabel;
        this.output = this.output + fieldsText;
      }
    });
    if (this.extraNotes !== '') {
      this.output = this.output + this.extraNotes;
    }
    if (this.totalCost > 0) {
      this.output = this.output + '\n\n Total Cost: $' + this.totalCost.toFixed(2);
    }
  }

}
