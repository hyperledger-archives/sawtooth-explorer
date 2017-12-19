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
import { BatchComponent } from '../batch/batch.component';
import { BatchDetailComponent } from './batch-detail.component';
import { DataTableComponent } from '../../data-table/data-table.component';
import { DynamicViewLoaderComponent } from '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';
import { EntityDetailComponent } from '../../entities/entity-detail/entity-detail.component';

describe('BatchDetailComponent', () => {
  let component: BatchDetailComponent;
  let fixture: ComponentFixture<BatchDetailComponent>;
  let backend: MockBackend;

  let params: Subject<Params> = new Subject<Params>();

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
    fixture = TestBed.createComponent(BatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
    expect(component.component).toEqual(BatchComponent);
  });

});
