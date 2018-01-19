import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { subscribe } from 'redux-subscriber';
import * as Redux from 'redux';

import { AppStore } from '../../store/store.module';
import { IAppState, IAccount, AccountActions, selectAccounts} from '../../store/store.module';
import { ISettingsState } from '../../store/models/settings/settings.model';

@IonicPage()
@Component({
    selector: 'page-account-list',
    templateUrl: './account-list.html'
})
export class AccountListPage implements OnInit {
    currentAcounts: IAccount[];
    unsubscribe: Function;

    constructor(@Inject(AppStore) private store: Redux.Store<IAppState>,
                public accountActions: AccountActions,
                public navCtrl: NavController,
                public modalCtrl: ModalController) {
        this.unsubscribe = subscribe('accounts', this.handleChange.bind(this));
    }

    ngOnInit() {
        this.store.dispatch(this.accountActions.getAccounts());
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    handleChange(state: ISettingsState) {
        this.currentAcounts = selectAccounts(state);
        this.currentAcounts.forEach(a => {
            switch(a.type) {
                case 'ETH':
                    a.logo = 'assets/imgs/eth.png';
                    break;
                case 'BTC':
                    a.logo = 'assets/imgs/btc.png';
                    break;
                default:
                    a.logo = 'assets/imgs/logo.png';
                    break;
            }
        })
    }

    ionViewDidLoad() {
    }

    /**
     * Prompt the user to add a new account. This shows our AccountCreatePage in a
     * modal and then adds the new account to the secure element.
     */
    addAccount() {
        let addModal = this.modalCtrl.create('AccountCreatePage');
        addModal.onDidDismiss(account => {
            if (account) {
                this.store.dispatch(this.accountActions.addAccount(account));
            }
        });
        addModal.present();
    }

    /**
     * Delete an account from the list of accounts.
     */
    deleteAccount(account) {
        // this.store.dispatch(this.accountActions.deleteAccount(account));
    }

    /**
     * Navigate to the detail page for this item.
     */
    openAccount(account: IAccount) {
        this.navCtrl.push('AccountDetailPage', {
            account: account
        });
    }
}
