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

describe('SawtoothExplorer, Explorer Page', () => {
  let page: ExplorerPage;

  beforeEach(() => {
    page = new ExplorerPage();
    page.navigateTo();

    // waiting for angular to load causes test to timeout from http request, so disable for explorer page
    browser.ignoreSynchronization = true;
  });

  afterEach(() => {
    // enable angular sync
    browser.ignoreSynchronization = false;
  });

  it('changes the view type via the view type dropdown', () => {
    page.switchViewType(1);

    let h2 = element(by.css('h2'));
    expect(h2.getText()).toEqual('Batch Detail');
  });

  it('navigates to a Transaction Detail when a transaction ID link is clicked', () => {
    page.switchViewType(0);

    let h2 = element(by.css('h2'));
    expect(h2.getText()).toEqual('Transaction Detail');

    let itemIDLink = element(by.css('p.id')).element(by.css('a'));
    itemIDLink.click();

    h2 = element(by.css('h2'));
    browser.wait(ExpectedConditions.presenceOf(h2), 3000);

    expect(browser.getCurrentUrl()).toContain('/transactions');
    expect(h2.getText()).toEqual('Transaction Detail');
  });

  it('navigates to a Batch Detail when a batch ID link is clicked', () => {
    page.switchViewType(1);

    let h2 = element(by.css('h2'));
    expect(h2.getText()).toEqual('Batch Detail');

    let itemIDLink = element(by.css('p.id')).element(by.css('a'));
    itemIDLink.click();

    h2 = element(by.css('h2'));
    browser.wait(ExpectedConditions.presenceOf(h2), 3000);

    expect(browser.getCurrentUrl()).toContain('/batches');
    expect(h2.getText()).toEqual('Batch Detail');
  });

  it('navigates to a Block Detail when a block link is clicked', () => {
    page.switchViewType(2);

    let h2 = element(by.css('h2'));
    expect(h2.getText()).toEqual('Block Detail');

    let itemIDLink = element(by.css('p.id')).element(by.css('a'));
    itemIDLink.click();

    h2 = element(by.css('h2'));
    browser.wait(ExpectedConditions.presenceOf(h2), 3000);

    expect(browser.getCurrentUrl()).toContain('/blocks');
    expect(h2.getText()).toEqual('Block Detail');
  });

  it('shows an error if a Transaction Detail is not found', () => {
    browser.get('/transactions/bad-id');

    let error = element(by.css('p.error-text'));

    browser.wait(ExpectedConditions.presenceOf(error), 3000);

    expect(error.isDisplayed()).toBeTruthy();
  });

  it('shows an error if a Batch Detail is not found', () => {
    browser.get('/batches/bad-id');

    let error = element(by.css('p.error-text'));

    browser.wait(ExpectedConditions.presenceOf(error), 3000);

    expect(error.isDisplayed()).toBeTruthy();
  });

  it('shows an error if a Block Detail is not found', () => {
    browser.get('/blocks/bad-id');

    let error = element(by.css('p.error-text'));

    browser.wait(ExpectedConditions.presenceOf(error), 3000);

    expect(error.isDisplayed()).toBeTruthy();
  });
});
