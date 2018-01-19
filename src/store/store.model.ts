export * from './models/account/account.model';
export * from './models/settings/settings.model';

import { IAccountsState, initialAccountState } from './models/account/account.model';
import { ISettingsState, initialSettingsState } from './models/settings/settings.model';

// State Interface
//
export interface IAppState {
    accounts: IAccountsState;
    settings: ISettingsState;
}

export const initialState = {
    accounts: initialAccountState,
    settings: initialSettingsState
};