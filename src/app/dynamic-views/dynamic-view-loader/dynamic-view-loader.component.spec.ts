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
import { Component, DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";

import { DynamicViewDirective } from '../dynamic-view-directive/dynamic-view.directive';
import { DynamicViewLoaderComponent } from './dynamic-view-loader.component';


@Component({
  template: `<div id="test">{{ data.message }}</div>` 
})
class TestTemplateComponent {}

@Component({
  template: `<div dynamic-view-loader component="component" data="data"></div>` 
})
class TestDynamicViewLoaderComponent {
  component = TestTemplateComponent;
  data = { message: 'Hey!' };
}

describe('DynamicViewLoaderComponent', () => {
  let component: DynamicViewLoaderComponent;
  let fixture: ComponentFixture<DynamicViewLoaderComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicViewDirective,
        DynamicViewLoaderComponent,
        TestDynamicViewLoaderComponent,
        TestTemplateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicViewLoaderComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('#test'));
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });
});
