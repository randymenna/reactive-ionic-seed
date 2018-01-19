import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import { IAccount } from '../../models/account/account.model';

// mock data
//
// IAccount {
//     key?: string;
//     address?: string;
//     name: string;
//     created?: Date;
//     active?: boolean;
// }


const testAccounts: Array<IAccount> = [
    {
        key: '1234',
        address: '5678',
        type: 'ABC',
        name: 'ABC - Account 1',
        created: new Date(),
        active: true
    },
    {
        key: '4321',
        address: '8765',
        type: 'DEF',
        name: 'DEF - Account 1',
        created: new Date(),
        active: true
    }
];

@Injectable()
export class AccountService {

    constructor() {
    }

    loadAll(): Observable<Array<IAccount>> {
        return Observable.of(testAccounts).delay(2000)
            .map(result => result);
    }

    addOne(account: IAccount): Observable<IAccount> {
        return Observable.of(account).delay(1000)
            .map(result => result);
    }
}
