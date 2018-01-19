import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppStore } from '../../store/store.module';
import * as Redux from 'redux';
import { subscribe } from 'redux-subscriber';

import { IAccount } from '../../store/store.module';
import { IAppState, IUserSettings, ISettingsState, SettingsActions, selectSettings } from '../../store/store.module';

@IonicPage()
@Component({
    selector: 'page-account-detail',
    templateUrl: './account-detail.html'
})
export class AccountDetailPage implements OnInit, OnDestroy {
    account: IAccount;
    currency: string;
    unsubscribe: Function;

    constructor(@Inject(AppStore) private store: Redux.Store<IAppState>,
                private settingsActions: SettingsActions,
                private navCtrl: NavController,
                private navParams: NavParams
    ){
        this.account = navParams.get('account');
        this.unsubscribe = subscribe('settings', this.handleSettings.bind(this));
    }

    ngOnInit() {
        this.store.dispatch(this.settingsActions.getSettings());
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    handleSettings(state: ISettingsState) {
        let s: IUserSettings = selectSettings(state);

    }
}
