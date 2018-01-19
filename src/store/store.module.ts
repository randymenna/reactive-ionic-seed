import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createStore, Store, applyMiddleware, compose } from 'redux';
import initSubscriber from 'redux-subscriber';
import thunk from 'redux-thunk';
import { InjectionToken } from '@angular/core';
import { IAppState } from '../store/store.model';
import { reducers } from '../store/store.reducers';
import { environment } from '../environments/environment';

import { IonicStorageModule } from '@ionic/storage';

import { actionProviders } from './store.actions';
import { initialAccountState, initialSettingsState } from './store.model';

export * from './store.model';
export * from './store.actions';
export * from './store.reducers';

const initialState = {
    accounts: initialAccountState,
    settings: initialSettingsState
};

let middleware = [ thunk ];

const composeEnhancers = !environment.production && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : compose;

function createAppStore(): Store<IAppState> {
    let store = createStore<IAppState>(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
    initSubscriber(store);
    return store;
}

export const AppStore = new InjectionToken('App.store');

@NgModule({
    imports: [
        CommonModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        { provide: AppStore, useFactory: createAppStore },
        ...actionProviders
    ]
})

export class AppStoreModule {
}
