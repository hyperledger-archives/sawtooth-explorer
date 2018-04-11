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
import { Params, RouterModule } from '@angular/router';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { AceEditorDirective } from 'ng2-ace';

import { MatIconModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Subject } from 'rxjs/Subject';

import { StateMonitorComponent } from './state-monitor.component';
import { StateComponent } from '../state/state.component';
import { DataTableComponent } from '../../data-table/data-table.component';
import { APIService } from '../../services/api-service/api.service';
import { DynamicViewLoaderComponent } from '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';

// TODO: find a reliable mock for WebSocket connections, enable this test suite
xdescribe('StateMonitorComponent', () => {
  let component: StateMonitorComponent;
  let fixture: ComponentFixture<StateMonitorComponent>;
  let backend: MockBackend;

  let params: Subject<Params> = new Subject<Params>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        DataTableComponent,
        DynamicViewLoaderComponent,
        StateComponent,
        StateMonitorComponent
      ],
      providers: [
        APIService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule
      ]
    })
    .compileComponents();

    backend = TestBed.get(MockBackend);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('addAddress: adds an address to the list of monitored addresses', () => {
    let currentAddressesLen = component.addresses.length;
    let newAddress = '123';
    component.addAddress(newAddress);

    // make sure new address is added to component list of addresses
    expect(component.addresses.length).toEqual(currentAddressesLen + 1);
    let idx = component.addresses.indexOf(newAddress);
    expect(idx).not.toEqual(-1);
    expect(component.addresses[idx]).toEqual(newAddress);
    // make sure address form model is reset
    expect(component.newAddress).toEqual('');
  });

  it('addAddress: handles attempt to add invalid address to monitored addresses', () => {
    let currentAddressesLen = component.addresses.length;
    let newAddress = null;
    component.addAddress(newAddress);

    // make sure new address is added to component list of addresses
    expect(component.addresses.length).toEqual(currentAddressesLen);
    let idx = component.addresses.indexOf(newAddress);
    expect(idx).toEqual(-1);

    newAddress = '';
    component.addAddress(newAddress);

    // make sure new address is added to component list of addresses
    expect(component.addresses.length).toEqual(currentAddressesLen);
    idx = component.addresses.indexOf(newAddress);
    expect(idx).toEqual(-1);
  });

  it('removeAddress: removes an address from the list of monitored addresses', () => {
    // set up component monitored addresses to contain an address to remove
    let address = '123';
    component.addresses = [address];
    let currentAddressesLen = component.addresses.length;

    let idx = component.addresses.indexOf(address);
    component.removeAddress(idx);
    idx = component.addresses.indexOf(address);
    expect(component.addresses.length).toEqual(currentAddressesLen - 1);
    expect(idx).toEqual(-1);
  });

  it('removeAddress: handles request to remove an item not in the list of monitored addresses', () => {
    // set up component monitored addresses to contain an address to remove
    let address = '000000';
    let currentAddressesLen = component.addresses.length;
    let idx = component.addresses.indexOf(address);
    expect(idx).toEqual(-1);

    component.removeAddress(idx);
    expect(component.addresses.length).toEqual(currentAddressesLen);
    expect(idx).toEqual(-1);

    // check invalid bounds
    component.removeAddress(-5);
    expect(component.addresses.length).toEqual(currentAddressesLen);
    expect(idx).toEqual(-1);

    component.removeAddress(currentAddressesLen + 5);
    expect(component.addresses.length).toEqual(currentAddressesLen);
    expect(idx).toEqual(-1);
  });

  it('parseDeltaSubscriptionMessage: parses a new websocket message with state delta data', () => {
    let data = {
      state_changes: [{
        block_id: '1',
        block_num: 1,
        previous_block_id: '0',
        data: {
          key: 'value'
        }
      }]
    };
    let message = { data: JSON.stringify(data) };

    let expected = [{
      payload: {
        block_id: '1',
        block_num:1,
        previous_block_id: '0',
        data: {
          key: 'value'
        }
      }
    }];

    let result = component.parseDeltaSubscriptionMessage(message);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it('parseDeltaSubscriptionMessage: handles websocket messages with no state delta data', () => {
    let message, result;

    message = {};
    result = component.parseDeltaSubscriptionMessage(message);
    expect(result).toEqual([]);

    message = { data: '{}' };
    result = component.parseDeltaSubscriptionMessage(message);
    expect(result).toEqual([]);

    message = { data: '{"state_changes":[]}' };
    result = component.parseDeltaSubscriptionMessage(message);
    expect(result).toEqual([]);
  });
});
