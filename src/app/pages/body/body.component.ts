import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  private includeCost = true;

  constructor(private fieldService: FieldsService, private csService: CloudStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1000) {
      this.showBookingNotes = false;
      this.mobileView = true;
    }
    // load local storage
    this.fieldService.checkStorage().then(() => {
      this.subscribeToFields();
    });
    // if user logged in check cloud storage
    if (this.csService.canSync().value) {
      this.fieldService.checkCloudStorage();
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

  onCostChange(groupId: number, field: any) {
    this.costUpdate(groupId, field);

    this.fieldsJson.forEach(group => {
      group.fields.forEach(field => {

        const fieldCost = field.cost ? +field.cost : 0.00;
        if (field.cost) {
          this.totalCost = this.totalCost + fieldCost;
        }
        else {
          field.cost = fieldCost;
        }
      })
    });
    this.updateOutput();
  }

  private costUpdate(groupId: number, field: JsonField) {
    const fieldId = '$' + field.id.split('-')[0];
    const index = this.fieldsJson[groupId].fields.findIndex(jsonField => fieldId === jsonField.id);
    const selected: boolean = this.fieldsJson[groupId].fields[index].selected;

    if (selected) {
      this.fieldsJson[groupId].fields[index].cost = field.value;
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

  onToggleCost(event: boolean) {
    this.includeCost = event;
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
      const booking = this.fieldService.updateStorage();
      this.csService.pushBooking(booking);
    }
    else {
      this.router.navigate(['auth']);
    }
  }

  private updateOutput() {
    this.output = this.notesTitle;
    this.fieldsJson.forEach(group => {
      let fieldsText = '';
      group.fields.forEach((field: JsonField) => {
        if (field.selected) {
          fieldsText = fieldsText + ' \n - ' + field.text + ': ' + field.value + (field.cost > 0 && this.includeCost ? ' - $' + Number(field.cost).toFixed(2) : '');
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
    if (this.totalCost > 0 && this.includeCost) {
      this.output = this.output + '\n\n Total Cost: $' + this.totalCost.toFixed(2);
    }
    this.fieldService.fields.next(this.fieldsJson);
    this.fieldService.extraNotes.next(this.extraNotes);
    this.fieldService.outputNotes.next(this.output);
    this.fieldService.totalCost.next(this.totalCost);
    this.fieldService.updateStorage();
  }

}
