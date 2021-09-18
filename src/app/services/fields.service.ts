import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { JsonGroup } from '../shared/interfaces/json-group';
import { LocalStorageService } from './local-storage.service';

import * as fieldData from '../../assets/json/fields.json';
import { JsonStorage } from '../shared/interfaces/json-storage';
import { CloudStorageService } from './cloud-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsService implements OnDestroy {

  storageKey = 'bike-assessment.aux.codes';

  fields: BehaviorSubject<JsonGroup[]> = new BehaviorSubject<JsonGroup[]>([]);
  extraNotes: BehaviorSubject<string> = new BehaviorSubject<string>('');
  outputNotes: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private bookingsSubscription: Subscription;

  constructor(private storageService: LocalStorageService, private csService: CloudStorageService) {
    this.resetFields();
  }

  ngOnDestroy() {
    if (this.bookingsSubscription) {
      this.bookingsSubscription.unsubscribe();
    }
  }

  async checkStorage() {
    await this.storageService.readJSONEntry(this.storageKey).then(storage => {
      if (storage) {
        this.fields.next(storage.fields);
        this.extraNotes.next(storage.extraNotes);
        this.outputNotes.next(storage.outputNotes);
      }
    });
  }

  checkCloudStorage() {
    this.bookingsSubscription = this.csService.pullBooking().subscribe(bookings => {
      if (bookings.length > 0) {
        const firstBooking = bookings[bookings.length - 1];
        this.fields.next(firstBooking.fields);
        this.extraNotes.next(firstBooking.extraNotes);
        this.outputNotes.next(firstBooking.outputNotes);
      }
    });
  }

  loadBooking(position: number) {
    const booking = this.csService.booking(position);
    this.fields.next(booking.fields);
    this.extraNotes.next(booking.extraNotes);
    this.outputNotes.next(booking.outputNotes);
  }

  clearStorage() {
    this.storageService.clearStorage();
    this.resetFields();
  }

  private resetFields() {
    this.fields.next(fieldData.data);
    this.extraNotes.next('');
    this.outputNotes.next('');
  }

  updateStorage(): JsonStorage {
    const jsonEntry: JsonStorage = {
      'dateTimeStamp': Date.now(),
      'fields': this.fields.value,
      'extraNotes': this.extraNotes.value,
      'outputNotes': this.outputNotes.value,
    }
    this.storageService.updateJSONEntry(this.storageKey, jsonEntry);
    return jsonEntry;
  }

}
