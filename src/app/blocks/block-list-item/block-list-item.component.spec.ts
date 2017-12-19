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

import { Base64DecodePipe } from '../../pipes/base64-decode/base64-decode.pipe';
import { BlockListItemComponent } from './block-list-item.component';

describe('BlockListItemComponent', () => {
  let component: BlockListItemComponent;
  let fixture: ComponentFixture<BlockListItemComponent>;

  // data for a block
  const blockData: object = require('../../../assets/mock-data/block.json');
  const blockID = '7a45c2f92dbe952cbc234f8ac1cba56c20011fe9f0b799ece2e030c078182a687eb5222de42b9b990bb85c1646163a928bfe5a6f8161ab50108f9bd4c6ae32e7';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Base64DecodePipe,
        BlockListItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListItemComponent);
    component = fixture.componentInstance;
    component.data = blockData['data'];
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('loads block data into the component', () => {
    expect(component.data['header_signature']).toEqual(blockID);
    expect(component.data['batches'].length).toEqual(2);
  });
});
