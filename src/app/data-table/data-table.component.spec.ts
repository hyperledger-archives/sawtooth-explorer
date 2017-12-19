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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material';

import { AceEditorDirective } from 'ng2-ace';

import { DataTableComponent } from './data-table.component';
import { DynamicViewLoaderComponent } from '../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';
import { BatchComponent } from '../batches/batch/batch.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  let mockData = [{
    header_signature: '1'
  }, {
    header_signature: '2'
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        BatchComponent,
        DataTableComponent,
        DynamicViewLoaderComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatPaginatorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    component.type = 'transaction';
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges: updates table data when the component data changes', () => {
    component.data = [{
      key: 'value'
    }];
    component.type = 'Batches';
    fixture.detectChanges();

    // call ngOnChanges manually because it's only called when
    // data is updated through a view, not programmatically
    component.ngOnChanges();
    expect(component.itemCount).toEqual(1);
    expect(component.component['name']).toEqual('BatchComponent');

    component.data = null;
    fixture.detectChanges();

    // call ngOnChanges manually because it's only called when
    // data is updated through a view, not programmatically
    component.ngOnChanges();
    expect(component.data).toEqual([]);
    expect(component.itemCount).toEqual(0);
  });

  it('updateTableDisplay: updates what the table is showing based on paging information', () => {
    // change to show only second entry in mock data
    let pageSize = 1;
    let pageIndex = 1;

    component.updateTableDisplay(pageSize, pageIndex);

    expect(component.items.length).toEqual(pageSize);
    expect(component.items).toEqual([mockData[1]]);
    expect(component.activeIdx).toEqual(-1);

    // change to show all mock data
    pageSize = mockData.length;
    pageIndex = 0;

    component.updateTableDisplay(pageSize, pageIndex);

    expect(component.items.length).toEqual(pageSize);
    expect(component.items).toEqual(mockData);
    expect(component.activeIdx).toEqual(-1);
  });

  it('updatePaging: updates data and paging variables when provided a paging event', () => {
    // change to show only second entry in mock data
    let pagingEvent = {
      pageSize: 1,
      pageIndex: 1
    };

    component.updatePaging(pagingEvent);

    expect(component.items.length).toEqual(pagingEvent.pageSize);
    expect(component.items).toEqual([mockData[1]]);
    expect(component.pageSize).toEqual(pagingEvent.pageSize);
    expect(component.pageIndex).toEqual(pagingEvent.pageIndex);
    expect(component.activeIdx).toEqual(-1);

    pagingEvent = {
      pageSize: mockData.length,
      pageIndex: 0
    };

    // change to show all mock data
    component.updatePaging(pagingEvent);

    expect(component.items.length).toEqual(pagingEvent.pageSize);
    expect(component.items).toEqual(mockData);
    expect(component.pageSize).toEqual(pagingEvent.pageSize);
    expect(component.pageIndex).toEqual(pagingEvent.pageIndex);
    expect(component.activeIdx).toEqual(-1);
  });

  it('setItemActive: updates the active item in the table', () => {
    let newActiveIdx = 3;
    component.setItemActive(newActiveIdx);
    expect(component.activeIdx).toEqual(newActiveIdx);
  });

  it('clearActiveItem: clears the active item in the table', () => {
    component.clearActiveItem();
    expect(component.activeIdx).toEqual(-1);
  });
      
});
