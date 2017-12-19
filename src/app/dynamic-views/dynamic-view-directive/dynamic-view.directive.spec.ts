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

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, ViewContainerRef, DebugElement, Type, NgModule, ComponentFactoryResolver } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DynamicViewDirective } from './dynamic-view.directive';

// "dummy" component using the DynamicViewDirective to dynamically
// add other components in the directive's place
@Component({
  template: `<div dynamic-view></div>` 
})
class TestDynamicViewComponent {}

// "dummy" component to be added dynamically via DynamicViewDirective
@Component({
  template: `<div id="test">Hey!</div>` 
})
class TestTemplateComponent {}

@NgModule({
  declarations: [TestTemplateComponent],
  entryComponents: [TestTemplateComponent]
})
class TestModule {}


describe('DynamicViewDirective', () => {
  let component: TestDynamicViewComponent;
  let templateComponent: TestTemplateComponent;
  let templateComponentType: Type<{}>;
  let fixture: ComponentFixture<TestDynamicViewComponent>;
  let templateFixture: ComponentFixture<TestTemplateComponent>;
  let componentFactoryResolver: ComponentFactoryResolver;
  let inputEl: DebugElement;
  let directive: DynamicViewDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicViewDirective,
        TestDynamicViewComponent
      ],
      providers: [
        DynamicViewDirective,
        ViewContainerRef
      ],
      imports: [TestModule]
    })
    .compileComponents();

    directive = TestBed.get(DynamicViewDirective);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDynamicViewComponent);
    templateFixture = TestBed.createComponent(TestTemplateComponent);
    component = fixture.componentInstance;
    templateComponent = templateFixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();
  });

  it('creates dummy component instances to test the directive', () => {
    expect(component).toBeTruthy();
    expect(templateComponent).toBeTruthy();
  });
});
