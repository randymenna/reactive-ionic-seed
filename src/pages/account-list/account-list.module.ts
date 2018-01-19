import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AccountListPage } from './account-list';

@NgModule({
  declarations: [
    AccountListPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountListPage),
    TranslateModule.forChild()
  ],
  exports: [
    AccountListPage
  ]
})
export class AccountListPageModule { }
