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

import { MatPaginatorModule } from '@angular/material';

import { AceEditorDirective } from 'ng2-ace';

import { BatchComponent } from './batch.component';
import { DataTableComponent } from
  '../../data-table/data-table.component';
import { DynamicViewLoaderComponent } from
  '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';

describe('BatchComponent', () => {
  let component: BatchComponent;
  let fixture: ComponentFixture<BatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective, 
        BatchComponent, 
        DataTableComponent, 
        DynamicViewLoaderComponent
      ],
      imports: [MatPaginatorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchComponent);
    component = fixture.componentInstance;
    component.data = {};
    component.showDataAsJSON = true;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit: populates new instance with formatted json data', () => {
    // create component with some data
    var data = {test: 'data'};
    let stringified = JSON.stringify(data, null, 2);

    component.data = data;
    fixture.detectChanges();

    // call ngOnInit again to test results with data
    component.ngOnInit();

    expect(component.jsonData).toEqual(stringified);
  });

  it('formatJSONData: formats JSON data received with the batch', () => {
    let payload, data, stringified, expected, result;

    let transaction = {
      header_signature: '1234',
      payload: {
        data: 'some data'
      }
    };
    let baseData = {
      transactions: [transaction]
    };

    // copy data and turn payload into base64, like it would be on the blockchain
    data = JSON.parse(JSON.stringify(baseData));
    data.transactions[0].payload = btoa(JSON.stringify(data.transactions[0].payload));

    // expected returned data should have stringified payload for angular UI Ace
    expected = JSON.parse(JSON.stringify(baseData));
    expected.transactions[0].payload = expected.transactions[0].payload, null, 2;
    stringified = JSON.stringify(expected, null, 2);

    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);
  });

  it('formatJSONData: handles incomplete/invalid JSON data received with the batch', () => {
    let data, stringified, result;

    // batch with no data
    data = null;
    // test should turn falsy data into an object
    stringified = '{}';
    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);

    // batch with no data
    data = undefined;
    // test should turn falsy data into an object
    stringified = '{}';
    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);

    // batch with no data
    data = {};
    stringified = JSON.stringify(data, null, 2);
    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);

    // batch with no transactions
    data = {transactions: []};
    stringified = JSON.stringify(data, null, 2);
    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);

    // batch with a transaction with no payload
    data = {
      transactions: [{
        header_signature: '1234'
      }]
    };
    stringified = JSON.stringify(data, null, 2);
    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);

    data = {
      transactions: [{
        header_signature: '1234',
        transactions: [{'test': 'data'}]
      }]
    };
    stringified = JSON.stringify(data, null, 2);
    result = component.formatJSONData(data);
    expect(result).toEqual(stringified);
  });

  it('formatTransactionData: formats transaction data in the batch data', () => {
    // unencoded data
    let baseData = {
      payload: {
        token_id: '1',
        share: 'aaa',
        action: 'RETURN_SHARE'
      }
    };

    // copy data and turn payload into base64, like it would be on the blockchain
    let data = JSON.parse(JSON.stringify(baseData));
    data.payload = btoa(JSON.stringify(data.payload));

    // expected returned data should have stringified payload for angular UI Ace
    let expected = JSON.parse(JSON.stringify(baseData));

    let result = component.formatTransactionData(data);
    expect(result).toEqual(expected);
  });

  it('formatTransactionData: handles incomplete/invalid transaction data in the batch data', () => {
    let baseData, data, expected, result;

    // unencoded data
    baseData = {
      payload: 'some payload'
    };

    // copy data and turn payload into base64, like it would be on the blockchain
    data = JSON.parse(JSON.stringify(baseData));
    data.payload = btoa(JSON.stringify(data.payload));

    // expected returned data should have stringified payload for angular UI Ace
    expected = JSON.parse(JSON.stringify(baseData));

    result = component.formatTransactionData(data);
    expect(result).toEqual(expected);

    // unencoded data
    baseData = {
      payload: {}
    };

    // copy data and turn payload into base64, like it would be on the blockchain
    data = JSON.parse(JSON.stringify(baseData));
    data.payload = btoa(JSON.stringify(data.payload));

    // expected returned data should have stringified payload for angular UI Ace
    expected = JSON.parse(JSON.stringify(baseData));

    result = component.formatTransactionData(data);
    expect(result).toEqual(expected);

    // unencoded data
    baseData = {
      payload: 0
    };

    // copy data and turn payload into base64, like it would be on the blockchain
    data = JSON.parse(JSON.stringify(baseData));
    data.payload = btoa(JSON.stringify(data.payload));

    // expected returned data should have stringified payload for angular UI Ace
    expected = JSON.parse(JSON.stringify(baseData));

    result = component.formatTransactionData(data);
    expect(result).toEqual(expected);
  });
});
