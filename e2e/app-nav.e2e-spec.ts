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
import { ExplorerPage } from './explorer.po';

describe('SawtoothExplorer, Navigation', () => {
  let page: ExplorerPage;

  beforeEach(() => {
    page = new ExplorerPage();
    page.navigateTo();

    // waiting for angular to load causes test to timeout from http request, so disable for explorer page
    browser.ignoreSynchronization = true;
  });

  afterEach(() => {
    // enable angular wait
    browser.ignoreSynchronization = false;
  });

  it('navigates to the Explorer page when the logo is clicked', () => {
    // start on a different page so page change is visible
    browser.get('/state-monitor');

    let logo = element(by.css('.se-dokchain-logo'));
    logo.click();

    let h2 = element(by.css('h2'));
    browser.wait(ExpectedConditions.presenceOf(h2), 3000);

    expect(h2.getText()).toEqual('Transaction Detail');
  });

  it('navigates to the Explorer page when the "Explorer" link is clicked', () => {
    // start on a different page so page change is visible
    browser.get('/state-monitor');

    let explorerLink = element.all(by.css('a.se-button')).get(1);
    explorerLink.click();

    let h2 = element(by.css('h2'));
    browser.wait(ExpectedConditions.presenceOf(h2), 3000);

    expect(h2.getText()).toEqual('Transaction Detail');
  });

  it('navigates to the State Monitor page when the "State Monitor" link is clicked', () => {
    let stateMonitorLink = element.all(by.css('a.se-button')).get(2);
    stateMonitorLink.click();

    let h2 = element(by.css('h2'));
    browser.wait(ExpectedConditions.presenceOf(h2), 3000);

    expect(h2.getText()).toEqual('State Monitor');
  });
});
