import { Injectable } from '@angular/core';
import { Action } from 'redux';

import { IUserSettings } from './settings.model';
import { SettingsService } from '../../services/settings-service/settings.service';

export interface ISettingAction extends Action {
    settings: IUserSettings;
}

export interface ISettingErrorAction extends Action {
    error: string;
}

@Injectable()
export class SettingsActions {

    constructor(private settingsService: SettingsService) {
    }

    // get the saved settings
    static GET_SETTINGS = '[Settings] Get';

    getSettings() {
        return dispatch => {
            this.settingsService.loadAll().then((settings: IUserSettings) => {
                dispatch(this.publishSettings(settings));
            }, (err) => {
                dispatch(this.getSettingsError(err));
            });
        };
    }

    static SET_SETTINGS = '[Settings] Set';

    setSettings(setting) {
        return dispatch => {
            this.settingsService.merge(setting).then((settings: IUserSettings) => {
                dispatch(this.publishSettings(settings));
            }, (err) => {
                dispatch(this.getSettingsError(err));
            });
        };
    }

    // publish the settings
    static PUBLISH_SETTINGS = '[Settings] Publish';

    publishSettings(settings: IUserSettings): ISettingAction {
        return {
            type: SettingsActions.PUBLISH_SETTINGS,
            settings: settings
        };
    }

    // show the error
    static GET_SETTINGS_ERROR = '[Setting] Load Error';

    getSettingsError(error: string): ISettingErrorAction {
        return {
            type: SettingsActions.GET_SETTINGS_ERROR,
            error: error

        };
    }
}