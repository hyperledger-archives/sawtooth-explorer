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

import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatTableModule, MatSnackBar, MatButtonModule } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';

import { APIService } from '../services/api-service/api.service';

import { BlockListItemComponent } from
  '../blocks/block-list-item/block-list-item.component';
import { BatchListItemComponent } from
  '../batches/batch-list-item/batch-list-item.component';
import { TransactionListItemComponent } from
  '../transactions/transaction-list-item/transaction-list-item.component';

/**
 * Component used to view detailed information about blocks, batches, and
 * transactions, and their relationships to one another.
 */
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  /**
   * @param apiService {APIService} - service for making API calls
   * @param activatedRoute {ActivatedRoute} - currently active route
   * @param router {Router} - service for accessing the UI router
   * @param snackBar {MatSnackBar} - service for showing snackbar notifications
   */
  constructor(private apiService: APIService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {}

  // list of items of a certain type
  items: object[];

  // type of items currently being viewed
  viewType: string;

  // paging settings
  currentHead: string;
  currentId: string
  nextPosition: string;
  previousId: string;

  // types of views user can select to see
  views = ['transactions', 'batches', 'blocks'];

  // component needed to render each item in the list of items (will be added
  // dynamically when the user selects a view type to see)
  listViewComponent: Component;

  // item selected from the item list to show details for
  selectedItem: object;

  // subscription to the items returned from the API
  apiItemsSubscription: Subscription;

  // list navigation pagination settings
  navPageSize = 10;
  navPageIndex = 0;
  navTotalItems = 0;
  navPageSizeOptions = [5, 10, 20, 50];

  // whether page is waiting to be displayed until the API request getting
  // its items has completed
  loading = true;

  // error data from API if it couldn't fetch the batch
  error: string;

  // error message to display when unable to complete API request
  private apiErrorMessage = 'Error fetching items from API';

  // empty subject to make sure subscription is destroyed when component is
  // destroyed
  private ngUnsubscribe: Subject<any> = new Subject();

  // for dynamically loading components by selected view type for list items
  listViewComponents = {
    'blocks': BlockListItemComponent,
    'batches': BatchListItemComponent,
    'transactions': TransactionListItemComponent
  };

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      let viewType = queryParams['view'];

      // prevent extra load during query param update
      if (this.viewType && viewType === this.viewType) {
        return false;
      }
      // set active view type if type is set in the URL
      this.viewType = this.views.indexOf(viewType) !== -1 ?
        viewType : 'transactions';
      this.subscribeToItems(this.viewType, {
        pageSize: this.navPageSize, pageIndex: this.navPageIndex
      });
    });
  }

  /**
   * Updates component view based on data returned from the API.
   * @param data {any} - data returned from API subscription
   */
  updateView(data: any) {
    if (!data) return;

    if (this.navPageIndex === 0) {
      this.items = [];
    }

    this.items = data.data;
    this.navTotalItems = data.data.length;
    this.currentHead = data.head;
    this.nextPosition = data.paging.next_position;

    this.selectedItem = this.items[0];

    // update component used to render the list of API items
    this.listViewComponent = this.listViewComponents[this.viewType];

    // update url to reflect selection
    this.updateParams(this.viewType, this.currentHead);

    // show list of items after API is done loading
    this.loading = false;
  }

  /**
   * Updates listed API items based on paging updates.
   * @param event {object} - paging event
   */
  updateNavPaging(event: object) {
    this.navPageSize = event['pageSize'];
    this.navPageIndex = event['pageIndex'];
    this.subscribeToItems(this.viewType, event);
  }

  /**
   * Updates the page when the view type is changed.
   * @param viewType {string} - type of view to change to
   */
  onChangeViewType(viewType: string): void {
    this.viewType = viewType;
    this.currentHead = null;
    this.nextPosition = null;
    this.navPageIndex = 0;

    this.subscribeToItems(this.viewType, {
      pageSize: this.navPageSize, pageIndex: this.navPageIndex
    });
  }

  /**
   * Subscribes to items fetched from an API endpoint.
   * @param viewType {string} - name of the type of view currently shown
   * @param pagingSettings {object} - settings for API paging
   */
  subscribeToItems(viewType: string, pagingSettings: object) {
    // nav should wait for API to load
    this.loading = true;

    // end previous subscription before starting a new one
    if (this.apiItemsSubscription) {
      this.apiItemsSubscription.unsubscribe();
    }
    pagingSettings['head'] = this.currentHead;
    pagingSettings['start'] = this.nextPosition;
    this.apiItemsSubscription = this.apiService
      .getItems(viewType, pagingSettings)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.updateView(data);
          this.error = undefined;
        },
        error => {
          this.loading = false;
          this.error = error.message ? error.message : this.apiErrorMessage + '.';
          this.snackBar.open(this.apiErrorMessage +
            '(' + this.viewType + ').', undefined, {
            duration: 3000,
          });
          console.log(this.apiErrorMessage + ' (' + this.viewType + '): ', error);
        }
      );
  }

  /**
   * Updates the current detail view to show the selected item.
   * @param item {object} - item to be shown in the detail view
   */
  showItemDetails(item: any): void {
    this.selectedItem = item;

    // update url to reflect selection
    this.updateParams(this.viewType, this.currentHead);
  }

  /**
   * Updates query string parameters so that specific view can be represented in
   * the URL.
   * @param viewType {string} - name of the type of view currently shown
   */
  updateParams(viewType: string, currentHead): void {
    // update query string params to reflect selected item
    const queryParams: Params = Object.assign({},
      this.activatedRoute.snapshot.queryParams);
    queryParams['view'] = viewType;
    queryParams['head'] = currentHead;

    // navigate to same route to update query string params
    this.router.navigate(['.'], {
      queryParams: queryParams,
      replaceUrl: true,
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy() {
    // complete empty subscription to end all other active subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    // load the next page of results
    this.updateNavPaging({
      pageSize: this.navPageSize,
      pageIndex: this.navPageIndex + 1
    });
  }

}
