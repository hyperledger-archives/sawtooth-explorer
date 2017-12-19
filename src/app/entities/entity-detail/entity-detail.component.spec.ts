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

import { async, fakeAsync, tick, discardPeriodicTasks, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule, MatPaginatorModule } from '@angular/material';

import { AceEditorDirective } from 'ng2-ace';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { APIService } from '../../services/api-service/api.service';
import { EntityDetailComponent } from './entity-detail.component';
import { BatchComponent } from '../../batches/batch/batch.component';
import { BatchDetailComponent } from '../../batches/batch-detail/batch-detail.component';
import { DataTableComponent } from '../../data-table/data-table.component';
import { DynamicViewLoaderComponent } from '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';

describe('EntityDetailComponent', () => {
  let component: EntityDetailComponent;
  let fixture: ComponentFixture<EntityDetailComponent>;
  let backend: MockBackend;

  let params: Subject<Params> = new Subject<Params>();

  // because entity requires a type, use batch for this example
  const batchData: object = require('../../../assets/mock-data/batch.json');
  const batchID = '4ce4f20e221ffbe4f598cbe6123bf7390a5cdae109237e459f17ffdc307b8705029a5e5c3e3c870b3dd9421b53e7d49acf18cddd08e61f39698f42778ecd9f7d';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        BatchComponent,
        BatchDetailComponent,
        DataTableComponent,
        DynamicViewLoaderComponent,
        EntityDetailComponent
      ],
      imports: [
        MatSnackBarModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [
        APIService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: ActivatedRoute,
          useValue: { params: params }
        }
      ]
    })
    .compileComponents();

    backend = TestBed.get(MockBackend);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDetailComponent);
    component = fixture.componentInstance;
    // set up entity as a batch
    component.collection = 'batches';
    component.displayName = 'Batch';
    component.component = BatchComponent;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('updates the component data when it fetches entity data from the ID in the URL', fakeAsync(() => {
    // mock API response
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(batchData)
      }));
    });

    expect(component.data).toBeDefined();
    expect(component.data).toEqual({});

    // give URL ID param so API can fetch data
    params.next({'id': batchID});
    tick();

    expect(component.data).toBeDefined();
    expect(component.data['header_signature']).toEqual(batchID);

    // make async with observable work
    discardPeriodicTasks();
  }));

  it('handles errors appropriately', (done) => {
    // mock API response
    let errorMessage = 'Error fetching item from API.';
    backend.connections.subscribe(connection => { 
      connection.mockError(new Response(<ResponseOptions>{ 
        status: 404,
        body: errorMessage
      }));
    });

    expect(component.error).not.toBeDefined();

    // give URL ID param so API can fetch data
    params.next({'id': batchID});

    expect(component.error).toBeDefined();
    expect(component.error).toEqual(errorMessage);

    // make async with observable work
    done();
  });
});
