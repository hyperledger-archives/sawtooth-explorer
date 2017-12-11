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

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Base64DecodePipe } from '../../pipes/base64-decode/base64-decode.pipe';

/**
 * Component for showing details of a state delta.
 */
@Component({
  selector: 'state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss', '../../../styles/shared/_explorer-detail.scss'],
  providers: [Base64DecodePipe]
})
export class StateComponent implements OnInit {

  // data representing the state delta
  @Input() data: any = {};

  // data stringified for Angular UI Ace to display
  payloadJSON = '{}';

  // set default UI Ace display to show as plain text (no syntax highlighting)
  aceMode = 'json';

  /**
   * @param base64DecodePipe {Base64DecodePipe} - used for decoding base64
   *   to ascii strings
   */
  constructor(private base64DecodePipe: Base64DecodePipe) {}

  ngOnInit() {
    // format payload for Angular UI Ace
    this.updatePayloadData(this.data.payload);
  }

  ngOnChanges() {
    // format payload for Angular UI Ace
    this.updatePayloadData(this.data.payload);
  }

  /**
   * Updates state delta payload so it can be displayed in UI Ace
   * @param payloadData - data representing the payload within a state delta
   */
  updatePayloadData(payloadData: any): void {
    if (payloadData) {
      payloadData.value = this.parsePayloadValue(payloadData.value);
      // if valid results are parsed, update payload JSON
      if (payloadData.value) {
        this.payloadJSON = JSON.stringify(payloadData, null, 2);
      } else {
        this.payloadJSON = '{}';
      }
    }
  }

  /**
   * Transforms the payload's `value` property, a base64 encoded payload of the
   * data within a state delta, into JSON for display with the rest of the state
   * delta.
   * @param value - the data of the actual change for a state delta
   */
  parsePayloadValue(value: any): any {
    if (!value) return value;

    // format payload for Angular UI Ace
    let fromBase64 = this.base64DecodePipe.transform(value);

    // try to parse payload value as JSON; otherwise, leave as-is
    try {
      fromBase64 = JSON.parse(fromBase64);
    } catch (e) {}

    return fromBase64;
  }
}
