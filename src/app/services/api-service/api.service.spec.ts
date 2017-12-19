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

import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { APIService } from './api.service';

describe('APIService', () => {
  let service: APIService;
  let backend: MockBackend;

  const transactionsData: any = require('../../../assets/mock-data/transactions.json');
  const transactionData: any = require('../../../assets/mock-data/transaction.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        APIService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    backend = TestBed.get(MockBackend);

    service = TestBed.get(APIService);
  });

  it('creates an instance', () => {
    expect(service).toBeDefined();
  });

  it('gets a list of items from a url', () => {
    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(transactionsData)
      }));
    });

    let itemsObservable = service.getItems('transactions');
    itemsObservable.subscribe(data => {
      expect(data).toBeDefined();
      expect(data['data'].length).toEqual(10);
    });
  });

  it('handles error getting a list of items from a url', () => {
    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockError(new Response(<ResponseOptions>{ 
        status: 404,
        body: 'Not found'
      }));
    });

    let itemsObservable = service.getItems('bad-entity');
    itemsObservable.subscribe(
      data => {},
      error => {
        expect(error).toBeDefined();
      });
  });

  it('gets a single item from a url by its ID', () => {
    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(transactionData)
      }));
    });

    let itemID = 'b92e956f5eba91892bf4c1c1d5ed61a52f7f8b19c1bbbf3eefd9322377efd69b0966fcbcb102f21f8aab8cc4980b1fbb89d3ea8e032f3862a0a21a49f7c34966';

    let itemsObservable = service.getItemByID('transactions', itemID);
    itemsObservable.subscribe(data => {
      expect(data).toBeDefined();
      expect(data['header_signature']).toEqual(itemID);
    });
  });

  it('handles error getting an item from a url', () => {
    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockError(new Response(<ResponseOptions>{ 
        status: 404,
        body: 'Not found'
      }));
    });

    let itemsObservable = service.getItemByID('transactions', 'bad-id');
    itemsObservable.subscribe(
      data => {},
      error => {
        expect(error).toBeDefined();
      });
  });
});
