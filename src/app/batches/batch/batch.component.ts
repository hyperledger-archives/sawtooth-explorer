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

import { Component, Input, OnInit } from '@angular/core';
import { Base64DecodePipe } from '../../pipes/base64-decode/base64-decode.pipe';

/**
 * A component that formats all the data associated with a batch for display.
 */
@Component({
  selector: 'batch',
  templateUrl: './batch.component.html',
  styleUrls: [
    './batch.component.scss',
    '../../../styles/shared/_explorer-detail.scss'
  ],
  providers: [Base64DecodePipe]
})
export class BatchComponent implements OnInit {

  // data representing the batch
  @Input() data: any = {};

  // whether transaction data on this batch is shown as JSON
  @Input() showDataAsJSON?: boolean;

  // data stringified for Angular UI Ace to display
  jsonData = '{}';

  aceMode = 'json';

  /**
   * @param base64DecodePipe {Base64DecodePipe} -- used for decoding base64
   *   to ascii strings
   */
  constructor(private base64DecodePipe: Base64DecodePipe) {}

  ngOnInit(): void {
    // format data for Angular UI Ace
    this.jsonData = this.formatJSONData(this.data);
  }

  /**
   * Formats batch data into a JSON string with proper indentation for display.
   * @param transactionData - data representing a transaction within the batch
   * @returns {string} formatted JSON string of the data
   */
  formatJSONData(data: any) {
    if (!data) data = {};

    // format transactions within the batch data
    if (data.transactions && this.showDataAsJSON) {
      for (var txnIdx in data.transactions) {
        data.transactions[txnIdx] =
          this.formatTransactionData(data.transactions[txnIdx]);
      }
    }

    return JSON.stringify(data, null, 2);
  }

  /**
   * Formats information held in the payloads in a batch's transactions.
   * @param transactionData - data representing a transaction within the batch
   * @returns {object} formatted transaction data
   */
  formatTransactionData(transactionData: any): string {
    // decode transaction's payload from base64 into JSON
    if (transactionData && transactionData.payload) {
      transactionData.payload =
        this.base64DecodePipe.transform(transactionData.payload);
        try {
          transactionData.payload = JSON.parse(transactionData.payload);
        } catch(e) {}
    }
    return transactionData;
  }
}
