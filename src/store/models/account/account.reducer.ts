import { Action } from 'redux';
import { createSelector } from 'reselect';

import * as Model from './account.model';
import * as AA from './account.actions';

export function AccountReducer(state: Model.IAccountsState = Model.initialAccountState, action: Action = Model.defaultAccountAction): Model.IAccountsState {
    switch (action.type) {

        // Adds a new taaks to the list of things to do
        case AA.AccountActions.ADD_ACCOUNT: {
            const newAccount = (<AA.IAccountAction>action).account;
            const oldAccounts = state.accounts;
            return {
                ...state,
                accounts: [...oldAccounts, newAccount],
            };
        }

        // Load accounts retrieved from server
        case AA.AccountActions.GET_ACCOUNTS: {
            return {
                ...state,
                loading: true
            };
        }

        // Load accounts retrieved from server
        case AA.AccountActions.PUBLISH_ACCOUNTS: {
            const accounts = (<AA.IAccountsAction>action).accounts;
            return {
                ...state,
                accounts: accounts,
                loading: false
            };
        }

        // Set error when retieve from server fails
        case AA.AccountActions.ACCOUNT_ACTION_ERROR: {
            const error = (<AA.IAccountActionError>action).action + '() ' + (<AA.IAccountActionError>action).error;
            return {
                ...state,
                accounts: Model.emptyAccountsArray,
                loading: false,
                error: error
            };
        }

        default:
            return state;
    }
}

export const selectAccountsState = state => state.accounts;
export const selectAccounts = createSelector(
    selectAccountsState,
    s => s.accounts
);


