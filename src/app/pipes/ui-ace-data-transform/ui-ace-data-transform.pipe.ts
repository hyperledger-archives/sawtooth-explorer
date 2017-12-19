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

import { Pipe, PipeTransform } from '@angular/core';
import { Base64DecodePipe } from '../base64-decode/base64-decode.pipe';

/**
 * Used to transform data into a format displayable by Angular UI Ace, a textbox
 * that provides syntax hightlighting and line numbers for code/data.
 */
@Pipe({
  name: 'uiAceDataTransform'
})
export class UIAceDataTransformPipe implements PipeTransform {

  constructor(private base64Decode: Base64DecodePipe) {}

  /**
   * Transforms the data for display by Angular UI Ace.
   * @param value {any} - data to be transformed for display by UI Ace
   * @param args {any} - any additional information for the pipe
   * @returns {string} result.data - data as a string for display in UI ACE
   * @returns {string} result.aceDisplayMode - type of data that determines
   *   formatting like syntax highlighting
   */
  parseForUIAce (value: any, args?: any): any {

    if (!value) value = '';

    // set up default result
    let result = {
      data: '',
      aceDisplayMode: 'text'
    };

    // decode transaction's payload from base64 into JSON
    let fromBase64: any = this.base64Decode.transform(value);

    // attempt to parse the result as JSON
    let payloadData = fromBase64;
    try {
      payloadData = JSON.parse(fromBase64);
    } catch(e) {
    } finally {
      // if it's already a string, just return that
      if (typeof payloadData === 'string'){
        result.data = payloadData;
      } else {
        // whatever else it is, turn it into a string
        result.data = JSON.stringify(payloadData, null, 2);
        // change UI Ace's display mode to JSON for syntax highlighting
        result.aceDisplayMode = 'json';
      }
    }

    return result;
  }

  /**
   * Transforms the data for display by Angular UI Ace (only gets data) so
   * pipe can be used in a template.
   * @param value {any} - data to be transformed for display by UI Ace
   * @param args {any} - any additional information for the pipe
   * @returns {string} - data as a string for display in UI ACE
   */
  transform (value: any, args?: any): any {
    // only send data back for template function
    return this.parseForUIAce(value, args).data;
  }
}
