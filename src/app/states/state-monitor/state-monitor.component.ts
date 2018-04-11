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

import { Component, OnInit, OnDestroy, Input,
  HostListener } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

/**
 * Component for showing state deltas as they are received from a websocket.
 */
@Component({
  selector: 'app-state-monitor',
  templateUrl: './state-monitor.component.html',
  styleUrls: [
    './state-monitor.component.scss',
    '../../../styles/shared/_explorer-detail.scss'
  ]
})
export class StateMonitorComponent implements OnInit, OnDestroy {

  /**
   * @param http {Http} - service for making HTTP requests
   */
  constructor(public http:Http) {}

  // list of state deltas from addresses subscribed to
  @Input()
  states: object[];

  // observable for tracking changes to state deltas sent from websocket
  statesObservable: Subject<object>;

  // list of addresses to monitor for state delta changes
  addresses: string[];

  // model for user to add new address to list of monitored addresses
  newAddress: string;

  // web socket connection used to subscribe to state delta changes
  webSocket: WebSocket;

  webSocketUrl = environment.apiURL.replace(/^(https?):\/\//, 'ws:') + '/subscriptions';

  ngOnInit() {
    this.states = [];
    this.addresses = [];
  }

  ngOnDestroy() {
    this.closeWebsocket();
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    // make sure websocket is closed if the page closes
    this.closeWebsocket();
  }

  /**
   * Add a address to the list of addresses monitored for state deltas.
   * @param address {string} - address to be added to the list of
   *   addresses subscribed to
   */
  addAddress(address: string) {
    // if no address is sent, no need to make any changes
    if (!address) return;

    this.addresses.push(address);
    this.newAddress = '';

    // restart state delta subscription with newly added address included
    this.resetWebsocket(this.addresses);
  }

  /**
   * Removes a address from the list of addresses monitored for state
   * deltas.
   * @param index {number} - the index of the address in the list of
   *   addresses subscribed to
   */
  removeAddress(index: number) {
    // only remove address from existing address list at valid index
    if (!this.addresses || this.addresses.length <= index) return;

    // check index bounds
    if (index < 0 || index >= this.addresses.length) return;

    // remove item at index
    this.addresses.splice(index, 1);

    // restart state delta subscription with removed address not included
    this.resetWebsocket(this.addresses);
  }

  /**
   * Reset any existing websocket connection with new subscription information.
   * @param addresses {string[]} - list of addresses to subscribe to via
   *     websocket
   */
  resetWebsocket(addresses: string[]) {
    // reset websocket connection
    this.closeWebsocket();
    this.openWebsocket(this.addresses);
  }

  /**
   * Subscribes to state changes made to specific address spaces.
   * @param addresses {number} - list of addresses to subscribe to via
   *   websocket
   */
  openWebsocket(addresses: string[]): void {
    if (!addresses || !addresses.length) return;

    // subscribe to state changes from specified addresses
    this.webSocket = new WebSocket(this.webSocketUrl);
    this.webSocket.onopen = () => {
      this.webSocket.send(JSON.stringify({
        'action': 'subscribe',
        'address_prefixes': addresses
      }))
    }

    this.webSocket.onmessage = (message) => {
      let newStates = this.parseDeltaSubscriptionMessage(message);
      if (newStates && newStates.length) {
        this.states = this.states.concat(newStates);
      }
    }
  }

  /**
   * Parses response from state delta subscription.
   * @param message {Object} - response sent from websocket subscription
   * @return {Object[]} - list of summaries of all state changes included in
   *   original message
   */
  parseDeltaSubscriptionMessage(message: object): object[] {
    // list of parsed state delta data from subscription message
    let stateChanges = [];

    // message needs to include data
    if (!message['data']) return stateChanges;

    // data from the message
    let messageData = JSON.parse(message['data']);
    console.log(messageData);
    let stateChangeData = messageData['state_changes'];

    // if no state changes are included in the result, no need to report it
    if (!stateChangeData) return stateChanges;

    // compile summary of information for each state delta included in
    // subscription message
    stateChangeData.forEach(change => {
      stateChanges.push({
        block_id: messageData['block_id'],
        block_num: messageData['block_num'],
        previous_block_id: messageData['previous_block_id'],
        payload: change
      } as object);
    });

    return stateChanges;
  }

  /**
   * Unsubscribes to state changes.
   */
  closeWebsocket(): void {
    if (this.webSocket) {
      this.webSocket.send(JSON.stringify({
        'action': 'unsubscribe'
      }));
      this.webSocket.close();
    }
    this.webSocket = null;
  }

}
