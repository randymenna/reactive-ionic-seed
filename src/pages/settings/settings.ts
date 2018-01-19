import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { subscribe } from 'redux-subscriber';

import { AppStore } from '../../store/store.module';
import * as Redux from 'redux';
import { IAppState, IUserSettings, ISettingsState, SettingsActions, selectSettings } from '../../store/store.module';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit, OnDestroy {
    // Our local settings object
    options: any;

    settingsReady = false;

    form: FormGroup;

    profileSettings = {
        page: 'profile',
        pageTitleKey: 'SETTINGS_PAGE_PROFILE'
    };

    page: string = 'main';
    pageTitleKey: string = 'SETTINGS_TITLE';
    pageTitle: string;

    subSettings: any = SettingsPage;

    languages = ['EN', 'DE'];
    language: string;

    currencies = ['USD', 'EUR'];
    currency: string;

    unsubscribe: Function;

    constructor(@Inject(AppStore) private store: Redux.Store<IAppState>,
                public settingsActions: SettingsActions,
                public navCtrl: NavController,
                public formBuilder: FormBuilder,
                public navParams: NavParams,
                public translate: TranslateService) {
        this.unsubscribe = subscribe('settings', this.handleChange.bind(this));
    }

    ngOnInit() {
        this.store.dispatch(this.settingsActions.getSettings());
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    handleChange(state: ISettingsState) {
        let s: IUserSettings = selectSettings(state);
        this.language = s.language;
        this.currency = s.currency;
    }

    ionViewWillEnter() {
        // Build an empty form for the template to render
        this.form = this.formBuilder.group({});

        this.page = this.navParams.get('page') || this.page;
        this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

        this.translate.get(this.pageTitleKey).subscribe((res) => {
            this.pageTitle = res;
        })
    }

    ngOnChanges() {
        console.log('Ng All Changes');
    }

    changeLanguage() {
        this.store.dispatch(this.settingsActions.setSettings({language: this.language}));
    }

    changeCurrency() {
        this.store.dispatch(this.settingsActions.setSettings({currency: this.currency}));
    }
}
