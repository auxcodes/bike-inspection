import { Injectable } from '@angular/core';

import { JsonStorage } from '../shared/interfaces/json-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  supported = true;
  hasEntry = () => localStorage.length > 0;

  constructor() {
    this.supported = window.localStorage ? true : false;
  }


  updateEntry(key: string, value: string) {
    if (this.supported) {
      localStorage.setItem(key, value);
    }
  }

  updateJSONEntry(key: string, value: JsonStorage) {
    if (this.supported) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  readEntry(key: string) {
    if (this.supported && this.hasEntry) {
      return localStorage.getItem(key);
    }
    return null;
  }

  async readJSONEntry(key: string): Promise<JsonStorage> {
    if (this.supported && this.hasEntry) {
      return JSON.parse(localStorage.getItem(key));
    }
    else {
      return null;
    }
  }

  deleteEntry(key: string) {
    if (this.supported && this.hasEntry) {
      localStorage.removeItem(key);
    }
  }

  clearStorage() {
    if (this.supported && this.hasEntry) {
      localStorage.clear();
    }
  }
}
