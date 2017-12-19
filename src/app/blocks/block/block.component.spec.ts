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

import { MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Base64DecodePipe } from
  '../../pipes/base64-decode/base64-decode.pipe';
import { BlockComponent } from './block.component';
import { DataTableComponent } from
  '../../data-table/data-table.component';
import { DynamicViewLoaderComponent } from
  '../../dynamic-views/dynamic-view-loader/dynamic-view-loader.component';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        Base64DecodePipe,
        BlockComponent,
        DataTableComponent,
        DynamicViewLoaderComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    component.data = {};
    component.showDataAsJSON = true;
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });
});
