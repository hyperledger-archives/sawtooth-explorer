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

import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

import { BlockComponent } from '../blocks/block/block.component';
import { BatchComponent } from '../batches/batch/batch.component';
import { TransactionComponent } from
  '../transactions/transaction/transaction.component';
import { StateComponent } from '../states/state/state.component';

/**
 * Table that uses data passed into the component for display.
 * 
 * Usage example:
 *     <data-table [data]="items" type="Transactions"></api-table>
 * where `data` is the list of all data, and `type` is the name representing the
 * data (displayed at the top of the table as a user-friendly title).
 */
@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges {
  @Input() data = [];
  @Input() type: string;

  // link to paging controls for table
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // component to render to show item information
  component: Component;

  // actively displayed data after paging is applied
  items = [];

  // index of detail view currently expanded in view
  activeIdx = -1;

  // since data is static, no need to subscribe
  itemCount = 0;

  // paging variables
  pageSizeOptions = [10, 20, 50, 100];
  pageSize = 50;
  pageIndex = 0;

  // for dynamically loading components by selected view type for list items
  components = {
    'blocks': BlockComponent,
    'batches': BatchComponent,
    'transactions': TransactionComponent,
    'states': StateComponent
  };

  ngOnChanges(): void {
    if (!this.data) this.data = [];

    // component to render to show item information
    this.component = this.components[this.type.toLowerCase()];

    // update displayed page data to show
    this.itemCount = this.data.length ? this.data.length : 0;

    // update data shown in the table
    this.updateTableDisplay(this.pageSize, this.pageIndex);
  }

  /**
   * Updates the control given new paging information sent by paging component.
   * @param event {object} - event containing new paging information
   */
  updatePaging(event): void {
    // update paging information based on event
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.updateTableDisplay(this.pageSize, this.pageIndex);

    // reset displayed detail view
    this.activeIdx = -1;
  }

    /**
   * Updates variables used for displaying the table
   * @param pageSize {number} - number of items to be shown by the table
   * @param pageIndex {number} - paging "offset" to determine which items the table should show
   */
  updateTableDisplay(pageSize, pageIndex): void {
    // slice data to get paging
    this.items = this.data.slice(pageSize * pageIndex,
      pageSize * pageIndex + pageSize);

    // reset displayed detail view
    this.activeIdx = -1;
  }

  /**
   * Update an item in the list of items to be in the active state
   * @param itemIdx - index of the item in items to be marked as active
   */
  setItemActive(itemIdx) {
    this.activeIdx = itemIdx;
  }

  /**
   * Clear active item from list of items
   */
  clearActiveItem() {
    this.setItemActive(-1);
  }
}
