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

  bookingReference: BehaviorSubject<string> = new BehaviorSubject<string>('');
  lastUpdate: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  fields: BehaviorSubject<JsonGroup[]> = new BehaviorSubject<JsonGroup[]>([]);
  extraNotes: BehaviorSubject<string> = new BehaviorSubject<string>('');
  outputNotes: BehaviorSubject<string> = new BehaviorSubject<string>('');
  totalCost: BehaviorSubject<number> = new BehaviorSubject<number>(0.00);

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
        this.updateFields(storage);
      }
    });
  }

  checkCloudStorage() {
    this.bookingsSubscription = this.csService.pullBooking().subscribe();
  }

  loadBooking(position: number) {
    const booking = this.csService.booking(position);
    this.updateFields(booking);
  }

  clearStorage() {
    this.storageService.clearStorage();
    this.resetFields();
  }

  private updateFields(booking: JsonStorage) {
    this.bookingReference.next(booking.reference);
    this.lastUpdate.next(booking.dateTimeStamp);
    this.fields.next(booking.fields);
    this.extraNotes.next(booking.extraNotes);
    this.outputNotes.next(booking.outputNotes);
  }

  private resetFields() {
    this.bookingReference.next('');
    this.lastUpdate.next(Date.now());
    this.fields.next(fieldData.data);
    this.extraNotes.next('');
    this.outputNotes.next('');
  }

  updateStorage(): JsonStorage {
    const jsonEntry: JsonStorage = {
      'reference': this.bookingReference.value,
      'dateTimeStamp': this.lastUpdate.value,
      'fields': this.fields.value,
      'extraNotes': this.extraNotes.value,
      'outputNotes': this.outputNotes.value,
      'totalCost': this.totalCost.value
    }
    this.storageService.updateJSONEntry(this.storageKey, jsonEntry);
    return jsonEntry;
  }

}
