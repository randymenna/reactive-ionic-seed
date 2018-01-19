/**
 * Example of kinds of state
 */
export type Currency =
    'USD'
    | 'EUR';

export interface IUserSettings {
    language: string,
    currency: Currency;
}

// Setting State
//
export interface ISettingsState {
    userSettings: IUserSettings;
    loading: boolean;
    error: string;
}

export const defaultUserSettings: IUserSettings = { language: 'EN', currency: 'USD' };

export const initialSettingsState: ISettingsState = {
    userSettings: defaultUserSettings,
    loading: false,
    error: ''
};

export const defaultSettingsAction = {
    type: 'NO_ACTION'
};
