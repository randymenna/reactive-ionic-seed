import { Reducer, Selector, Thunk } from 'redux-testkit';
import { async, inject, TestBed } from '@angular/core/testing';

import * as Account from './account.reducer';
import { AccountActions } from './account.actions';
import * as Model from './account.model';

import { AccountService } from '../../services/account-service/account.service';

const testAccount: Model.IAccount = {
    key: '9876',
    address: 'FE85',
    type: 'ETH',
    name: 'ETH - Account 2',
    created: new Date(),
    active: true
};

const testAccounts: Model.IAccount[] = [
    {
        key: '1234',
        address: '5678',
        type: 'ETH',
        name: 'ETH - Account 1',
        created: new Date(),
        active: true
    },
    {
        key: 'ABCD',
        address: 'EFGH',
        type: 'BTC',
        name: 'BTC - Account 1',
        created: new Date(),
        active: true
    }
];

const testError = 'This is a loading error';

const testAccountState: Model.IAccountsState = {
    accounts: testAccounts,
    loading: false,
    error: testError
};

const TestAppState = {
    accounts: testAccountState
};

describe('store/Account/reducer', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                AccountActions,
                AccountService
            ]
        });
    }));

    it('should have initial state', () => {
        expect(Account.AccountReducer()).toEqual(Model.initialAccountState);
    });

    it('NON_ACTION should not affect state', () => {
        const action = {type: 'NON_ACTION'};
        Reducer(Account.AccountReducer).expect(action).toReturnState(Model.initialAccountState);
    });

    // it('should add a account', inject([AccountActions, AccountService], (accountActions: AccountActions, accountService: AccountService) => {
    //     const result = Reducer(Account.AccountReducer).withState(Model.initialAccountState).execute(accountActions.addAccount(testAccount));
    //     expect(result.account.key).toEqual('9876');
    // }));
    //
    // it('should add a account v2', inject([AccountActions, AccountService], (accountActions: AccountActions, accountService: AccountService) => {
    //     Reducer(Account.AccountReducer).expect(accountActions.addAccount(testAccount)).toReturnState({
    //         ...Model.initialAccountState,
    //         accounts: [
    //             {...testAccount}
    //         ]
    //     });
    // }));
    //
    // it('should change the filter', () => {
    //     const filter = 'Complete';
    //     Reducer(Account.AccountReducer).expect(Action.accountFilter(filter)).toReturnState({
    //         ...Model.initialState,
    //         filter: filter
    //     });
    // });
    //
    // it('should set the loading flag on GET_ACCOUNTS', () => {
    //     Reducer(Account.AccountReducer).expect(Action.accountsGet()).toReturnState({...Model.initialAccountStateState, loading: true});
    // });

    it('should publish the accounts array on successful get request', inject([AccountActions, AccountService], (accountActions: AccountActions, accountService: AccountService) => {
        Reducer(Account.AccountReducer).expect(accountActions.publishAccounts(testAccounts)).toReturnState({
            ...Model.initialAccountState,
            accounts: [...Model.initialAccountState.accounts, ...testAccounts]
        });
    }));

    it('should set error on failed server request', inject([AccountActions], (accountActions: AccountActions) => {
        const type = 'get';
        const error = 'the call failed';
        Reducer(Account.AccountReducer).expect(accountActions.accountActionError(type, error)).toReturnState({
            ...Model.initialAccountState,
            error: type + '() ' + error
        });
    }));
});

// describe('store/Account/selectors', () => {
//
//     it('should get the Account list', () => {
//         Selector(Account.getAccountArray).expect(TestAppState).toReturn(testAccounts);
//     });
//
//     it('should get the Account list loading flag', () => {
//         Selector(Account.getAccountLoading).expect(TestAppState).toReturn(true);
//     });
//
//     it('should get the Account list loading error', () => {
//         Selector(Account.getAccountError).expect(TestAppState).toReturn(testError);
//     });
// });

