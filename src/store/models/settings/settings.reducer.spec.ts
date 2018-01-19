import { Reducer, Selector } from 'redux-testkit';
import { async, inject, TestBed } from '@angular/core/testing';
import { IonicStorageModule, Storage } from '@ionic/storage';

import * as Setting from './settings.reducer';
import { SettingsActions } from './settings.actions';
import * as Model from './settings.model';
import { SettingsService } from  '../../services/settings-service/settings.service';

const  testSettings: Model.IUserSettings =
    {
        language: 'en',
        currency: 'USD'
    };

const testError = 'This is a loading error';

const testSettingState: Model.ISettingsState = {
    userSettings:  testSettings,
    loading: false,
    error: testError
};

const TestAppState = {
    settings: testSettingState
};

function provideSettings(storage: Storage) {
    // The Settings provider takes a set of default settings for your app.
    return new SettingsService(storage, Model.defaultUserSettings);
}

describe('store/Setting/reducer', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicStorageModule.forRoot()
            ],
            providers: [
                { provide: SettingsService, useFactory: provideSettings, deps: [Storage] },
                SettingsActions
            ]
        });
    }));

    it('should have initial state', () => {
        expect(Setting.SettingReducer()).toEqual(Model.initialSettingsState);
    });

    it('NON_ACTION should not affect state', () => {
        const action = {type: 'NON_ACTION'};
        Reducer(Setting.SettingReducer).expect(action).toReturnState(Model.initialSettingsState);
    });

    // it('should add a setting-item', () => {
    //     const setting = 'test string';
    //     const result = Reducer(Setting.SettingReducer).withState(Model.initialState).execute(Action.settingAdd(setting));
    //     expect(result.settings-service.length).toEqual(1);
    //     expect(result.settings-service[0].content).toContain(setting);
    // });
    //
    // it('should change the filter', () => {
    //     const filter = 'Complete';
    //     Reducer(Setting.SettingReducer).expect(Action.settingFilter(filter)).toReturnState({
    //         ...Model.initialState,
    //         filter: filter
    //     });
    // });

    // it('should set the loading flag on GET_SETTINGS', () => {
    //     Reducer(Setting.SettingReducer).expect(Action.settingsGet()).toReturnState({...Model.initialSettingsState, loading: true});
    // });

    it('should get the settings on successful local storage request', inject([SettingsService, SettingsActions], (settingsService: SettingsService, settingsActions: SettingsActions) => {
        Reducer(Setting.SettingReducer).expect(settingsActions.publishSettings(testSettings)).toReturnState({
            ...Model.initialSettingsState,
            userSettings: { ...Model.initialSettingsState.userSettings, ...testSettings }
        });
    }));

    it('should set error on failed server request', inject([SettingsService, SettingsActions], (settingsService: SettingsService, settingsActions: SettingsActions) => {
        const error = 'the rest call failed';
        Reducer(Setting.SettingReducer).expect(settingsActions.getSettingsError(error)).toReturnState({
            ...Model.initialSettingsState,
            error: error
        });
    }));
});

// describe('store/Setting/selectors', () => {
//
//     it('should get the Setting list', () => {
//         Selector(Setting.getSettingArray).expect(TestAppState).toReturn( testSettings);
//     });
//
//     it('should get the Setting list loading flag', () => {
//         Selector(Setting.getSettingLoading).expect(TestAppState).toReturn(true);
//     });
//
//     it('should get the Setting list loading error', () => {
//         Selector(Setting.getSettingError).expect(TestAppState).toReturn(testError);
//     });
// });


