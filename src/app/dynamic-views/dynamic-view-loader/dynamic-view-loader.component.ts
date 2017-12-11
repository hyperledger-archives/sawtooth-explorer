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

import { Component, AfterViewInit, Input, ViewChild, Type,
  ComponentFactoryResolver } from '@angular/core';

import { DynamicViewDirective } from '../dynamic-view-directive/dynamic-view.directive';

/**
 * Component that can dynamically load another component at runtime.
 */
@Component({
  selector: 'dynamic-view-loader',
  templateUrl: './dynamic-view-loader.component.html',
  styleUrls: ['./dynamic-view-loader.component.scss']
})
export class DynamicViewLoaderComponent implements AfterViewInit {

  // component the data should be redered as
  @Input() component: Type<{}>;

  // data needed to render the item as a list item
  @Input() data = {};

  // any extra properties needed by the dynamic views
  @Input() params = {};

  // directive used for the placement of the dynamic component
  @ViewChild(DynamicViewDirective) dynamicView: DynamicViewDirective;

  /**
   * @param componentFactoryResolver {ComponentFactoryResolver} - used to
   *   dynamically load components at runtime.
   */
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    // timeout to prevent errors from data being updated after initial load
    setTimeout(_ => this.loadComponent(this.data, this.component, this.params));
  }

  /**
   * Loads data into the specified component.
   * @param itemData {object} - data to be displayed by the dynamic component
   * @param itemComponent {Type} - component to be rendered dynamically
   */
  loadComponent(itemData: object, itemComponent: Type<{}>, params?: any) {
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(itemComponent);

    let viewContainerRef = this.dynamicView.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance['data'] = itemData;

    // add any additional properties to component
    if (params) {
      for (var param in params) {
        componentRef.instance[param] = params[param];
      }
    }
  }
}
