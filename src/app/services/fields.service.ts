import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { JsonGroup } from '../shared/interfaces/json-group';
import { LocalStorageService } from './local-storage.service';

import * as fieldData from '../../assets/json/fields.json';
import { JsonStorage } from '../shared/interfaces/json-storage';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  storageKey = 'bike-assessment.aux.codes';

  fields: BehaviorSubject<JsonGroup[]> = new BehaviorSubject<JsonGroup[]>([]);
  extraNotes: BehaviorSubject<string> = new BehaviorSubject<string>('');
  outputNotes: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private storageService: LocalStorageService) {
    this.resetFields();
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

  clearStorage() {
    this.storageService.clearStorage();
    this.resetFields();
  }

  private resetFields() {
    this.fields.next(fieldData.data);
    this.extraNotes.next('');
    this.outputNotes.next('');
  }

  updateStorage() {
    const jsonEntry: JsonStorage = {
      'fields': this.fields.value,
      'extraNotes': this.extraNotes.value,
      'outputNotes': this.outputNotes.value,
    }
    this.storageService.updateJSONEntry(this.storageKey, jsonEntry);
  }

}
