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

import { BatchListItemComponent } from './batch-list-item.component';

describe('BatchListItemComponent', () => {
  let component: BatchListItemComponent;
  let fixture: ComponentFixture<BatchListItemComponent>;

  // data for a batch
  const batchData: object = require('../../../assets/mock-data/batch.json');
  const batchID = '4ce4f20e221ffbe4f598cbe6123bf7390a5cdae109237e459f17ffdc307b8705029a5e5c3e3c870b3dd9421b53e7d49acf18cddd08e61f39698f42778ecd9f7d';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchListItemComponent);
    component = fixture.componentInstance;
    component.data = batchData['data'];
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('loads data from a batch', () => {
    expect(component.data['header_signature']).toEqual(batchID);
    expect(component.data['transactions'].length).toEqual(1);
  });
});
