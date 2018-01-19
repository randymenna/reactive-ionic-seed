/**
 * Example of kinds of state
 */
export interface IAccount {
    key: string;
    address: string;
    type: string;
    name: string;
    created?: Date;
    active?: boolean;
    logo?: string;
}

export type Accounts = IAccount[];

// Account State
//
export interface IAccountsState {
    accounts: IAccount[];
    loading: boolean;
    error: string;
}

export const emptyAccountsArray: IAccount[] = [];

export const initialAccountState: IAccountsState = {
    accounts: emptyAccountsArray,
    loading: false,
    error: ''
};

export const defaultAccountAction = {
    type: 'NO_ACTION'
};
