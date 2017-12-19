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

import { browser, by, element, ExpectedConditions } from 'protractor';
import { StateMonitorPage } from './state-monitor.po';

describe('SawtoothExplorer, State Monitor page', () => {
  let page: StateMonitorPage;

  beforeEach(() => {
    page = new StateMonitorPage();
    page.navigateTo();
  });

  it('adds a new address/prefix to the list of monitored addresses', () => {
    let newAddress = '000000';

    let addressRows = element.all(by.css(page.addressRowSelector));
    addressRows.count().then(function (initialCount) {
      // add an address to be monitored
      page.addNewAddress(newAddress);

      expect(page.getAddressRowContent(0)).toEqual(newAddress);
      expect(addressRows.count()).toEqual(initialCount + 1);
    });
  });

  it('shows the latest state delta when a monitored address is added that has one', () => {
    // add an address to be monitored
    let newAddress = '000000';
    page.addNewAddress(newAddress);

    expect(page.getStateRowTitle(0)).toContain('Change received');
  });

  it('doesn\'t add an empty address/prefix to the list of monitored addresses', () => {
    let newAddress = '';

    let addressRows = element.all(by.css(page.addressRowSelector));
    addressRows.count().then(function (initialCount) {
      // add an address to be monitored
      page.addNewAddress(newAddress);

      addressRows = element.all(by.css(page.addressRowSelector));

      expect(addressRows.count()).toEqual(initialCount);
    });
  });

  it('removes an address/prefix from monitored addresses', () => {
    // set up test by adding one monitored address
    let newAddress = '000000';
    page.addNewAddress(newAddress);

    // make sure new address shows up in list before proceeding
    expect(page.getAddressRowContent(0)).toEqual(newAddress);

    let addressRows = element.all(by.css(page.addressRowSelector));
    addressRows.count().then(function(initialCount) {
      // delete new address
      page.getAddressDeleteButton(0).click();

      addressRows = element.all(by.css(page.addressRowSelector));

      expect(addressRows.count()).toEqual(initialCount - 1);
    });
  });
    
});
