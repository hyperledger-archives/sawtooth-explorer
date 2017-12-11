/**
 * Copyright 2017 PokitDok, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListItemComponent } from './transaction-list-item.component';

describe('TransactionListItemComponent', () => {
  let component: TransactionListItemComponent;
  let fixture: ComponentFixture<TransactionListItemComponent>;

    // data for a transaction
  const transactionData: object = require('../../../assets/mock-data/transaction.json');
  const transactionID = 'b92e956f5eba91892bf4c1c1d5ed61a52f7f8b19c1bbbf3eefd9322377efd69b0966fcbcb102f21f8aab8cc4980b1fbb89d3ea8e032f3862a0a21a49f7c34966';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionListItemComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListItemComponent);
    component = fixture.componentInstance;
    component.data = transactionData['data'];
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('loads data from a transaction', () => {
    expect(component.data['header_signature']).toEqual(transactionID);
  });
});
