import { Reducer, combineReducers } from 'redux';

import { AccountReducer } from './models/account/account.reducer';
import { SettingReducer } from './models/settings/settings.reducer';

import { IAppState } from './store.model';

// State reducers
//
export const reducers: Reducer<IAppState> = combineReducers({
    accounts: AccountReducer,
    settings: SettingReducer
});

export * from './models/settings/settings.reducer';
export * from './models/account/account.reducer';
