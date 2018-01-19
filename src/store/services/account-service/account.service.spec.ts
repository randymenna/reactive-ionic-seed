import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';

import * as Store from '../../store.module';
import { AccountService } from './account.service';

const testAccount: Store.IAccount = {
    key: '1234',
    address: '5678',
    type: 'ETH',
    name: 'ETH - Account 1',
    created: new Date(),
    active: true
};

describe('AccountService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccountService]
        });
    });

    it('should be created', inject([AccountService], (service: AccountService) => {
        expect(service).toBeTruthy();
    }));

    it('should return mock data', inject([AccountService], (service: AccountService) => {
        service.loadAll().subscribe(result => expect(result.length).toEqual(2));
    }));

    it('should add an account', inject([AccountService], (service: AccountService) => {
        service.addOne(testAccount).subscribe(result => expect(result.key).toEqual('1234'));
    }));
});
