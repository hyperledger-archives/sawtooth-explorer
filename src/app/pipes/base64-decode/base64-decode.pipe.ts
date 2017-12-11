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

/**
 * Used to decode base64 data within templates.
 */
@Pipe({
  name: 'base64decode'
})
export class Base64DecodePipe implements PipeTransform {

  public static BASE64_REGEX_STR = '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$';

  /**
   * Transforms the value passed from base64 to a plain text string.
   * @param value {any} - value to be transformed from base64
   * @param args {any} - any additional information for the pipe
   * @returns {string} - value as a readable string
   */
  transform(value: any, args?: any): any {
    if (!value) return value;

    let base64Regex = new RegExp(Base64DecodePipe.BASE64_REGEX_STR);
    let decodedValue = value;

    // attempt to decode from base64 if needed
    if (base64Regex.test(value)) {
      try {
        decodedValue = atob(value);
      } catch(e) {
      }
    }

    return decodedValue;
  }
}
