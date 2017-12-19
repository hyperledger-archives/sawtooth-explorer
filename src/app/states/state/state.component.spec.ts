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
import { AceEditorDirective } from 'ng2-ace';

import { StateComponent } from './state.component';

describe('StateComponent', () => {
  let component: StateComponent;
  let fixture: ComponentFixture<StateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AceEditorDirective,
        StateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateComponent);
    component = fixture.componentInstance;
    component.data = {};
    fixture.detectChanges();
  });

  it('creates an instance', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit: sets up initial JSON shown in component', () => {
    let data = {
      payload: {
        value: {
          one: 1,
          two: 'two'
        }
      }
    };
    let stringified = JSON.stringify(data.payload, null, 2);

    component.data = data;
    fixture.detectChanges();

    // call ngOnInit again to test results with data
    component.ngOnInit();

    expect(component.payloadJSON).toEqual(stringified);
  });

  it('ngOnChanges: updates JSON shown in component', () => {
    let data = {
      payload: {
        value: {
          one: 1,
          two: 'two'
        }
      }
    };
    let stringified = JSON.stringify(data.payload, null, 2);

    component.data = data;
    fixture.detectChanges();

    // call ngOnChanges manually because it's only called when
    // data is updated through a view, not programmatically
    component.ngOnChanges();

    expect(component.payloadJSON).toEqual(stringified);
  });

  it('updatePayloadData: updates the component state delta data shown in JSON', () =>{
    let data, stringified, base64Data;

    // make sure json is handled correctly
    data = {
      value: {
        data: {
          key: 'value'
        }
      }
    };
    stringified = JSON.stringify(data, null, 2);
    base64Data = btoa(JSON.stringify(data.value));
    data.value = base64Data;

    component.updatePayloadData(data);
    expect(component.payloadJSON).toEqual(stringified);

    // make sure string is handled correctly
    data = {
      value: {
        data: 'some data'
      }
    };
    stringified = JSON.stringify(data, null, 2);
    base64Data = btoa(JSON.stringify(data.value));
    data.value = base64Data;

    component.updatePayloadData(data);
    expect(component.payloadJSON).toEqual(stringified);
  });

  it('updatePayloadData: handles incomplete/invalid state delta data', () => {
    let data;

    // leave payload data as empty object if no valid 
    data = {};
    component.updatePayloadData(data);
    expect(component.payloadJSON).toEqual('{}');

    data = {
      payload: null
    };
    component.updatePayloadData(data);
    expect(component.payloadJSON).toEqual('{}');

    data = {
      payload: {
        value: null
      }
    };
    component.updatePayloadData(data);
    expect(component.payloadJSON).toEqual('{}');
  });

  it('parsePayloadValue: formats the state delta data to be shown as JSON', () => {
    let data, base64Data, result;

    // make sure json comes back as parsed json
    data = {
      data: 'some data'
    };
    base64Data = btoa(JSON.stringify(data));

    result = component.parsePayloadValue(base64Data);
    expect(result).toEqual(data);

    // make sure string comes back as string
    data = 'some data';
    base64Data = btoa(data);

    result = component.parsePayloadValue(base64Data);
    expect(result).toEqual(data);
  });

  it('parsePayloadValue: handles incomplete/invalid state delta data', () => {
    // invalid data returned as-is
    let data = null;
    let result = component.parsePayloadValue(data);
    expect(result).toEqual(data);
  });
});
