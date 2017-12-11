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

import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from "@angular/router";

import { AppComponent } from './app.component';

// "dummy" component to make mock routes
@Component({
  template: `<div></div>` 
})
class TestAppComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router;

  beforeEach(async(() => {
    let mockRoutes: Routes = [{
      path: '', component: TestAppComponent, pathMatch: 'full'
    }];

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(mockRoutes)
      ],
      declarations: [
        AppComponent, TestAppComponent
      ],
    }).compileComponents();

    router = TestBed.get(Router);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
