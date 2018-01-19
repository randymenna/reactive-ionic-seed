import { Storage } from '@ionic/storage';

import { SettingsActions } from './models/settings/settings.actions';
import { SettingsService } from './services/settings-service/settings.service';
import { defaultUserSettings } from './models/settings/settings.model';

import { AccountActions } from './models/account/account.actions';
import { AccountService } from './services/account-service/account.service';

export function provideSettings(storage: Storage) {
    // The Settings provider takes a set of default settings for your app.
    return new SettingsService(storage, defaultUserSettings);
}

export const actionProviders = [
    { provide: SettingsService, useFactory: provideSettings, deps: [Storage] },
    SettingsActions,
    AccountService,
    AccountActions
];

export {
    SettingsActions,
    AccountActions
}