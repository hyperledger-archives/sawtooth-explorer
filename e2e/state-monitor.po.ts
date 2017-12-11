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

export class StateMonitorPage {

  url = '/state-monitor';

  inputSelector = 'input';
  addButtonSelector = 'button.add-button';
  deleteButtonSelector = 'button.delete-button';
  addressRowSelector = 'tr.address-row';
  stateRowSelector = 'tr.mat-row';
  stateRowTitleSelector = 'p.list-id';

  navigateTo() {
    return browser.get(this.url);
  }

  addNewAddress(address) {
    // add address to form input
    let input = element(by.css(this.inputSelector));
    input.sendKeys(address);

    let button = element(by.css(this.addButtonSelector));
    button.click();
  }

  getAddressRowContent(rowIdx) {
    let addressRows = element.all(by.css(this.addressRowSelector));

    // wait until new item shows up in list
    browser.wait(ExpectedConditions.presenceOf(addressRows.get(0)), 3000);

    return addressRows.get(rowIdx).all(by.css('td')).get(0).getText();
  }

  getAddressDeleteButton(rowIdx) {
    let addressRows = element.all(by.css(this.addressRowSelector));
    browser.wait(ExpectedConditions.presenceOf(addressRows.get(0)), 3000);

    return addressRows.get(rowIdx).all(by.css('td')).get(1)
      .element(by.css(this.deleteButtonSelector));
  }

  getStateRowTitle(rowIdx) {
    let stateRow = element.all(by.css(this.stateRowSelector)).get(rowIdx);

    // wait until state row is visible
    browser.wait(ExpectedConditions.presenceOf(stateRow), 3000);

    return stateRow.element(by.css(this.stateRowTitleSelector)).getText();
  }
}
