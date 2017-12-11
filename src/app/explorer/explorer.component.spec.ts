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

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AceEditorDirective } from 'ng2-ace';

import { MatSelectModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';

import { APIService } from '../services/api-service/api.service';
import { Base64DecodePipe } from '../pipes/base64-decode/base64-decode.pipe';
import { BatchComponent } from '../batches/batch/batch.component';
import { BlockComponent } from '../blocks/block/block.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DynamicViewLoaderComponent } from '../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';
import { ExplorerComponent } from './explorer.component';
import { TransactionComponent } from '../transactions/transaction/transaction.component';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;

  let backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        Base64DecodePipe,
        BatchComponent,
        BlockComponent,
        DataTableComponent,
        DynamicViewLoaderComponent,
        ExplorerComponent,
        TransactionComponent
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
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    backend = TestBed.get(MockBackend);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    component.viewType = 'transactions';
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('updateView: updates populates a view with data', () => {
    let data = {
      data: [{
        id: '123',
        header_signature: '123'
      }],
      paging: {
        total_count: 1
      }
    };

    component.updateView(data);

    expect(component.items).toEqual(data.data);
    expect(component.navTotalItems).toEqual(data.data.length);
    expect(component.selectedItem).toEqual(data.data[0]);
    expect(component.listViewComponent['name']).toEqual('TransactionListItemComponent');
    expect(component.loading).toBeFalsy();
  });

  it('updateNavPaging: updates what items are shown in the explorer nav with provided paging information', fakeAsync(() => {
    let data = {
      data: [{
        id: '111',
        header_signature: '111'
      }, {
        id: '222',
        header_signature: '222'
      }],
      paging: {
        total_count: 2
      }
    };

    let pagingSettings = {
      pageSize: 2,
      pageIndex: 0
    };

    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(data)
      }));
    });

    component.updateNavPaging(pagingSettings);
    tick();

    expect(component.items).toEqual(data.data);
    expect(component.items.length).toEqual(data.data.length);
    expect(component.navTotalItems).toEqual(data.data.length);
    expect(component.selectedItem).toEqual(data.data[0]);
    expect(component.loading).toBeFalsy();
  }));

  it('onChangeViewType: updates items shown when view type is changed', fakeAsync(() => {
    let data = {
      data: [{
        id: '555',
        header_signature: '555'
      }],
      paging: {
        total_count: 1
      }
    };

    let pagingSettings = {
      pageSize: 1,
      pageIndex: 0
    };

    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(data)
      }));
    });

    component.onChangeViewType('batches');
    tick();

    expect(component.items).toEqual(data.data);
    expect(component.navTotalItems).toEqual(data.data.length);
    expect(component.selectedItem).toEqual(data.data[0]);
    expect(component.listViewComponent['name']).toEqual('BatchListItemComponent');
    expect(component.loading).toBeFalsy();
  }));

  it('subscribeToItems: sets up an API endpoint subscription with a given view type and paging settings', fakeAsync(() => {
    let data = {
      data: [{
        id: '321',
        header_signature: '321'
      }],
      paging: {
        total_count: 1
      }
    };

    let pagingSettings = {
      pageSize: 1,
      pageIndex: 0
    };

    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(data)
      }));
    });

    component.subscribeToItems('batches', pagingSettings);
    tick();

    expect(component.items).toEqual(data.data);
    expect(component.navTotalItems).toEqual(data.data.length);
    expect(component.selectedItem).toEqual(data.data[0]);
    expect(component.loading).toBeFalsy();
  }));

  it('showItemDetails: chooses an item to show detailed information about', () => {
    let item = {
      id: '123',
      header_signature: '123'
    };

    component.showItemDetails(item);

    expect(component.selectedItem).toEqual(item);
  });
});
