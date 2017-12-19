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

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { APIService } from '../../services/api-service/api.service';

/**
 * Detail view for an entity that calls the API for its data.
 */
@Component({
  selector: 'entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnInit, OnDestroy {

  /**
   * @param activatedRoute {ActivatedRoute} - currently active route
   * @param apiService {APIService} - service for making API calls
   * @param snackBar {MatSnackBar} - service for showing snackbar notifications
   */
  constructor(private activatedRoute: ActivatedRoute,
              private apiService: APIService,
              private snackBar: MatSnackBar) {}

  // name of the collection reached via API where an entity can be fetched
  // e.g., 'transactions', 'blocks'
  @Input() collection: string;

  // name of the entity for display
  @Input() displayName = 'Item';

  // component to load to show information about specific entity
  @Input() component: any;

  // ID of the batch (pulled from URL query string params)
  id: string;

  // data representing the block
  data = {};

  // whether the page is waiting on API response
  loading = true;

  // error data from API if it couldn't fetch the batch
  error: any;

  // observable watching the API request for an async response
  private dataObservable: Observable<object>;

  // error message to display when unable to complete API request
  private apiErrorMessage = 'Error fetching ' + this.displayName.toLowerCase() + ' from API';

  // empty subject to make sure subscription is destroyed when component is
  // destroyed
  private ngUnsubscribe: Subject<any> = new Subject();

  ngOnInit() {
    // subscribe to router event to get block ID
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;

      // call API for updated block data
      this.dataObservable = this.apiService.getItemByID(this.collection, this.id);

      this.dataObservable
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          data => {
            this.data = data;
            this.error = undefined;
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.error = error.message ? error.message : this.apiErrorMessage + '.';
            this.snackBar.open(this.error, undefined, {
              duration: 3000,
            });
            console.log(this.apiErrorMessage + ':', error);
          }
        );
    });
  }

  ngOnDestroy() {
    // complete empty subscription to end all other active subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
