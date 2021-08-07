import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { CloudStorageService } from '../../services/cloud-storage.service';
import { FieldsService } from '../../services/fields.service';
import { JsonField } from '../../shared/interfaces/json-field';
import { JsonGroup } from '../../shared/interfaces/json-group';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {

  title = 'bike-inspection';
  output = '';
  notesTitle = 'Inspection:'
  extraNotes = '';
  totalCost = 0;
  prices: { id: string; cost: number }[] = []

  screenWidth = 1500;
  showBookingNotes = true;
  mobileView = false;

  fieldsJson: JsonGroup[] = []

  private bookingsSub: Subscription;

  constructor(private fieldService: FieldsService, private csService: CloudStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1000) {
      this.showBookingNotes = false;
      this.mobileView = true;
    }

    this.fieldService.checkStorage().then(() => {
      this.subscribeToFields();
    });

    if (this.csService.canSync()) {
      this.bookingsSub = this.csService.pullBooking().subscribe( bookings => {
        console.log('any bookings? ', bookings);

        if (bookings) {
          console.log('bookings: ', bookings);
        }
        else {
          console.log('no bookings');
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  private subscribeToFields() {
    this.fieldService.fields.subscribe(fields => {
      this.fieldsJson = fields;
    });
    this.fieldService.extraNotes.subscribe(notes => {
      this.extraNotes = notes;
    });
    this.fieldService.outputNotes.subscribe(output => {
      this.output = output;
    });
  };

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
    this.mobileView = this.screenWidth < 1000 ? true : false;
    this.showBookingNotes = false;

  }

  onShowBookingNotes(show: boolean) {
    this.showBookingNotes = show;
  }

  onSyncStorage() {
    if (this.csService.canSync()) {
      this.csService.pushBooking();
    }
    else {
      this.router.navigate(['auth']);
    }
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
    this.fieldService.fields.next(this.fieldsJson);
    this.fieldService.extraNotes.next(this.extraNotes);
    this.fieldService.outputNotes.next(this.output);
    this.fieldService.updateStorage();
  }

}
