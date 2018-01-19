import { Action } from 'redux';
import { createSelector } from 'reselect';

import * as Model from './settings.model';
import * as SA from './settings.actions';

export function SettingReducer(state: Model.ISettingsState = Model.initialSettingsState, action: Action = Model.defaultSettingsAction): Model.ISettingsState {
    switch (action.type) {

        case SA.SettingsActions.SET_SETTINGS: {
            const newSettings = (<SA.ISettingAction>action).settings;
            return {
                ...state,
                userSettings: newSettings,
            };
        }

        case SA.SettingsActions.PUBLISH_SETTINGS: {
            const settings = (<SA.ISettingAction>action).settings;
            return {
                ...state,
                userSettings: settings,
                loading: false
            };
        }

        case SA.SettingsActions.GET_SETTINGS_ERROR: {
            const error = (<SA.ISettingErrorAction>action).error;
            return {
                ...state,
                userSettings: Model.defaultUserSettings,
                loading: false,
                error: error
            };
        }

        default:
            return state;
    }
}

export const selectSettingsState = state => state.settings;
export const selectSettings = createSelector(
    selectSettingsState,
    s => s.userSettings
);



