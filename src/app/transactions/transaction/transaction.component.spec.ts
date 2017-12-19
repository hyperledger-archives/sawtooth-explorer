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
import { RouterTestingModule } from '@angular/router/testing';
import { AceEditorDirective } from 'ng2-ace';

import { TransactionComponent } from './transaction.component';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        TransactionComponent
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    component.data = {};
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges: populates instance with updated, formatted json data', () => {
    let data = {
      payload: {
        data: 'other data'
      }
    };
    let stringified = JSON.stringify(data.payload, null, 2);

    component.data = data;
    fixture.detectChanges();

    // call ngOnChanges manually because it's only called when
    // data is updated through a view, not programmatically
    component.ngOnChanges();

    expect(component.payloadJSON).toEqual(stringified);
  });

  it('getFormatData: gets formatting information needed for a transaction payload to be displayed in string form', () => {
    let data, stringified, result;

    // test that string data is simply passed through formatting
    data = 'sawtooth settings string';

    result = component.getFormatData(data);
    expect(result.data).toEqual(data);
    expect(result.aceDisplayMode).toEqual('text');

    // test that json data is turned into a string
    data = {
      property: 'some value',
      key: {
        data: 'more data'
      }
    };
    stringified = JSON.stringify(data, null, 2);

    result = component.getFormatData(data);
    expect(result.data).toEqual(stringified);
    expect(result.aceDisplayMode).toEqual('json');
  });

  it('getFormatData: handles formatting for incomplete/invalid data for a transaction payload', () => {
    let data, stringified, result;

    // number should turn into a string
    data = undefined;
    stringified = '';

    result = component.getFormatData(data);
    expect(result.data).toEqual(stringified);
    expect(result.aceDisplayMode).toEqual('text');
  });

  it('updatePayloadData: updates payload JSON given data from a transaction', () => {
    // test that json data is turned into a string
    let data = {
      property: 'some value',
      key: {
        data: 'more data'
      }
    };
    let stringified = JSON.stringify(data, null, 2);

    let result = component.updatePayloadData(data);
    expect(component.payloadJSON).toEqual(stringified);
    expect(component.aceMode).toEqual('json');
  });

});
