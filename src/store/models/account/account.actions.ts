import { Injectable } from '@angular/core';
import { Action } from 'redux';

import { IAccount } from './account.model';
import { AccountService } from '../../services/account-service/account.service';

// These are all the actions that can be performed on the Accounts state

export interface IAccountAction extends Action {
    account: IAccount;
}

export interface IAccountsAction extends Action {
    accounts: IAccount[];
}

export interface IAccountActionError extends Action {
    action: string;
    error: string;
}

@Injectable()
export class AccountActions {

    constructor(private accountService: AccountService) {
    }

    static ADD_ACCOUNT = '[Account] Add';

    addAccount(account: IAccount) {
        return dispatch => {
            const action = 'Add';

            const decoration = {
                active: true,
                created: new Date()
            };
            const accountItem: IAccount = Object.assign({}, account, decoration);

            this.accountService.addOne(accountItem).subscribe((account: IAccount) => {
                dispatch({
                    type: AccountActions.ADD_ACCOUNT,
                    account: accountItem
                });
            }, (err) => {
                dispatch(this.accountActionError(action, err));
            }, () => {});
        };
    }

    // clear new account-item form
    static CLEAR_NEW_ACCOUNT = '[Account] Clear New';

    clearNewAccount(): Action {
        return {
            type: AccountActions.CLEAR_NEW_ACCOUNT
        };
    }

    static GET_ACCOUNTS = '[Account] Get';

    getAccounts() {
        const action = 'Get';

        return dispatch => {
            this.accountService.loadAll().subscribe((accounts: IAccount[]) => {
                dispatch(this.publishAccounts(accounts));
            }, (err) => {
                dispatch(this.accountActionError(action, err));
            }, () => {});
        };
    }

    // load the successful response
    static PUBLISH_ACCOUNTS = '[Account] Publish';

    publishAccounts(accounts: IAccount[]): IAccountsAction {
        return {
            type: AccountActions.PUBLISH_ACCOUNTS,
            accounts: accounts
        };
    }

    static ACCOUNT_ACTION_ERROR = '[Account] Action Error';

    accountActionError(action: string, error: string): IAccountActionError {
        return {
            type: AccountActions.ACCOUNT_ACTION_ERROR,
            action: action,
            error: error
        };
    }
}

