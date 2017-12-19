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
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AceEditorDirective } from 'ng2-ace';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { APIService } from '../../services/api-service/api.service';
import { DynamicViewLoaderComponent } from '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';
import { EntityDetailComponent } from '../../entities/entity-detail/entity-detail.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionDetailComponent } from './transaction-detail.component';

describe('TransactionDetailComponent', () => {
  let component: TransactionDetailComponent;
  let fixture: ComponentFixture<TransactionDetailComponent>;
  let backend: MockBackend;

  let params: Subject<Params> = new Subject<Params>();

  const transactionData: any = require('../../../assets/mock-data/transaction.json');
  const transactionID = 'b92e956f5eba91892bf4c1c1d5ed61a52f7f8b19c1bbbf3eefd9322377efd69b0966fcbcb102f21f8aab8cc4980b1fbb89d3ea8e032f3862a0a21a49f7c34966';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        DynamicViewLoaderComponent,
        EntityDetailComponent,
        TransactionComponent,
        TransactionDetailComponent
      ],
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        APIService,
        BaseRequestOptions,
        MockBackend,
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
    fixture = TestBed.createComponent(TransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

});
