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

import { inject } from '@angular/core/testing';

import { UIAceDataTransformPipe } from './ui-ace-data-transform.pipe';
import { Base64DecodePipe } from '../base64-decode/base64-decode.pipe';

describe('UIAceDataTransformPipe', () => {
  
  it('creates an instance', () => {
    const pipe = new UIAceDataTransformPipe(new Base64DecodePipe());
    expect(pipe).toBeTruthy();
  });

  it('transform: translates a base64 string into stringified JSON', () => {
    let decoded = {
      'test': 'hey!',
      'one': 1
    };
    let stringified = JSON.stringify(decoded, null, 2);
    let encoded: any = btoa(stringified);

    const pipe = new UIAceDataTransformPipe(new Base64DecodePipe());

    let result = pipe.transform(encoded);

    expect(result).toEqual(stringified);
  });

  it('transform: stringifies a JSON object even if it is not base64 encoded', () => {
    let decoded = {
      'test': 'hey!',
      'one': 1
    };
    let stringified = JSON.stringify(decoded, null, 2);

    const pipe = new UIAceDataTransformPipe(new Base64DecodePipe());

    // try it as normal JSON
    let result = pipe.transform(decoded);
    expect(result).toEqual(stringified);

    // try it as stringified JSON
    result = pipe.transform(stringified);
    expect(result).toEqual(stringified);
  });

  it('transform: handles invalid values appropriately', () => {
    let encoded = [
      null,
      undefined,
      '{}',
      {},
      3,
      'just some string'
    ];

    let decoded = [
      '',
      '',
      '{}',
      '{}',
      '3',
      'just some string'
    ];

    const pipe = new UIAceDataTransformPipe(new Base64DecodePipe());

    for (let i = 0; i < encoded.length; i++) {
      let result = pipe.transform(encoded[i]);
      expect(result).toEqual(decoded[i]);
    }
  });

  it('parseForUIAce: returns whether angular UI Ace should display in text or JSON mode', () => {
    let encoded = [
      'just some string',
      { 'test': 'object' }
    ];

    let aceModes = [
      'text',
      'json'
    ];

    const pipe = new UIAceDataTransformPipe(new Base64DecodePipe());

    for (let i = 0; i < encoded.length; i++) {
      let result = pipe.parseForUIAce(encoded[i]);
      expect(result.aceDisplayMode).toEqual(aceModes[i]);
    }
  });

});
