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

import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Base64DecodePipe } from '../../pipes/base64-decode/base64-decode.pipe';


/**
 * A component that formats all the data associated with a transaction for
 * display.
 */
@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: [
    './transaction.component.scss',
    '../../../styles/shared/_explorer-detail.scss'
  ],
  providers: [Base64DecodePipe]
})
export class TransactionComponent implements OnInit, OnChanges {

  // data representing the transaction
  @Input() data = {};

  // data stringified for Angular UI Ace to display
  payloadJSON = '{}';

  /**
   * @param uiAceDataTransformPipe {UIAceDataTransformPipe} - used to transform
   * data into a format displayable by Angular UI Ace
   */
  constructor() {}

  // ngOnInit needed in addition to ngOnChanges because when this view is
  // dynamically loaded as a component, ngOnInit fires, but ngOnChanges doesn't.
  ngOnInit() {
    // format payload for Angular UI Ace
    this.updatePayloadData(this.data['payload']);
  }

  ngOnChanges() {
    // format payload for Angular UI Ace
    this.updatePayloadData(this.data['payload']);
  }

  /**
   * Updates transaction payload so it can be displayed in UI Ace
   * @param payloadData - data representing the payload within a transaction
   */
  updatePayloadData(payloadData: any): void {
    this.payloadJSON = payloadData;
  }

}
