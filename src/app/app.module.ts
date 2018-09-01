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

/* GENERAL ANGULAR IMPORTS */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* MATERIAL DESIGN IMPORTS */
import { MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatTabsModule, MatTableModule,
  MatInputModule, MatButtonModule, MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';

/* MAIN PAGES */
import { ExplorerComponent } from './explorer/explorer.component';

/* ENTITY COMPONENTS */
import { EntityDetailComponent } from './entities/entity-detail/entity-detail.component';

/* BLOCK COMPONENTS */
import { BlockListItemComponent } from './blocks/block-list-item/block-list-item.component';
import { BlockDetailComponent } from './blocks/block-detail/block-detail.component';
import { BlockComponent } from './blocks/block/block.component';

/* BATCH COMPONENTS */
import { BatchListItemComponent } from './batches/batch-list-item/batch-list-item.component';
import { BatchDetailComponent } from './batches/batch-detail/batch-detail.component';
import { BatchComponent } from './batches/batch/batch.component';

/* TRANSACTION COMPONENTS */
import { TransactionListItemComponent } from './transactions/transaction-list-item/transaction-list-item.component';
import { TransactionDetailComponent } from './transactions/transaction-detail/transaction-detail.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';

/* STATE MONITORING COMPONENTS */
import { StateMonitorComponent } from './states/state-monitor/state-monitor.component';
import { StateComponent } from './states/state/state.component';

/* TABLE COMPONENTS */
import { DataTableComponent } from './data-table/data-table.component';

/* GENERAL SERVICES */
import { APIService } from './services/api-service/api.service';

/* DYNAMIC VIEW COMPONENTS */
import { DynamicViewDirective } from './dynamic-views/dynamic-view-directive/dynamic-view.directive';
import { DynamicViewLoaderComponent } from './dynamic-views/dynamic-view-loader/dynamic-view-loader.component';
import { Base64DecodePipe } from './pipes/base64-decode/base64-decode.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    EntityDetailComponent,
    BlockListItemComponent,
    BlockDetailComponent,
    BlockComponent,
    BatchListItemComponent,
    BatchDetailComponent,
    BatchComponent,
    TransactionListItemComponent,
    TransactionDetailComponent,
    TransactionComponent,
    StateMonitorComponent,
    StateComponent,
    DataTableComponent,
    DynamicViewDirective,
    DynamicViewLoaderComponent,
    Base64DecodePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [
    APIService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicViewLoaderComponent,
    BlockListItemComponent,
    BatchListItemComponent,
    TransactionListItemComponent,
    BlockComponent,
    BatchComponent,
    StateComponent,
    TransactionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
