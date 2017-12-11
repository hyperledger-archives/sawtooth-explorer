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

import { Base64DecodePipe } from './base64-decode.pipe';

describe('Base64DecodePipe', () => {
  it('creates an instance', () => {
    const pipe = new Base64DecodePipe();
    expect(pipe).toBeTruthy();
  });

  it('turns a base64 encoded string into human readable text', () => {
    let encoded = 'dGhpcyBpcyBhIHRlc3Qgc3RyaW5n';
    let decoded = 'this is a test string';

    const pipe = new Base64DecodePipe();

    let result = pipe.transform(encoded);
    expect(result).toEqual(decoded);
  });

  it('returns a non-base64 string as-is', () => {
    let encoded = 'this is a plain string';

    const pipe = new Base64DecodePipe();
    
    let result = pipe.transform(encoded);
    expect(result).toEqual(encoded);
  });

  it('returns invalid values as-is', () => {
    let encoded = [
      {},
      null,
      undefined,
      3
    ];

    const pipe = new Base64DecodePipe();
    
    for (let i = 0; i < encoded.length; i++) {
      let result = pipe.transform(encoded[i]);
      expect(result).toEqual(encoded[i]);
    }
  });
});
