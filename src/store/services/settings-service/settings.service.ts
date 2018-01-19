import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings-service/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class SettingsService {
  private SETTINGS_KEY: string = '_settings';

  settings: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
  }

  loadAll() {
    return new Promise((resolve, reject) => {
      this.storage.get(this.SETTINGS_KEY).then((value) => {
        if (value) {
          this.settings = value;
          resolve(this._mergeDefaults(this._defaults));
        } else {
          this.setAll(this._defaults).then((val) => {
            this.settings = val;
            resolve(this.settings);
          })
        }
      });
    })
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: any) {
    return new Promise((resolve, reject) => {
      for (let k in settings) {
        this.settings[k] = settings[k];
      }
      this.save();
      resolve(this.settings);
    });
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }
}
