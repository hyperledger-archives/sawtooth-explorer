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

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransactionDetailComponent} from './transactions/transaction-detail/transaction-detail.component'
import {BatchDetailComponent} from './batches/batch-detail/batch-detail.component'
import {BlockDetailComponent} from './blocks/block-detail/block-detail.component'
import {ExplorerComponent} from './explorer/explorer.component'
import {StateMonitorComponent} from './states/state-monitor/state-monitor.component'

export const routes: Routes = [
  {
    path: '',
    component: ExplorerComponent,
    pathMatch: 'full'
  },
  {
    path: 'transactions/:id',
    component: TransactionDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'batches/:id',
    component: BatchDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'blocks/:id',
    component: BlockDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'state-monitor',
    component: StateMonitorComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
