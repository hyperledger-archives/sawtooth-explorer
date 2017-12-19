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
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AceEditorDirective } from 'ng2-ace';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule, MatPaginatorModule } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { APIService } from '../../services/api-service/api.service';
import { Base64DecodePipe } from '../../pipes/base64-decode/base64-decode.pipe';
import { BlockComponent } from '../block/block.component';
import { BlockDetailComponent } from './block-detail.component';
import { DataTableComponent } from '../../data-table/data-table.component';
import { DynamicViewLoaderComponent } from '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';
import { EntityDetailComponent } from '../../entities/entity-detail/entity-detail.component';

describe('BlockDetailComponent', () => {
  let component: BlockDetailComponent;
  let fixture: ComponentFixture<BlockDetailComponent>;
  let backend: MockBackend;

  let params: Subject<Params> = new Subject<Params>();

  const blockData: object = require('../../../assets/mock-data/block.json');
  const blockID = '7a45c2f92dbe952cbc234f8ac1cba56c20011fe9f0b799ece2e030c078182a687eb5222de42b9b990bb85c1646163a928bfe5a6f8161ab50108f9bd4c6ae32e7';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        Base64DecodePipe,
        BlockComponent,
        BlockDetailComponent,
        DataTableComponent,
        DynamicViewLoaderComponent,
        EntityDetailComponent
      ],
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(BlockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

});
