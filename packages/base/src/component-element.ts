/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { LitElement, PropertyValues } from '@polymer/lit-element';
import { MDCWebComponentBase } from './mdc-web-component';
export { MDCWebComponentBase, MDCWebComponentMixin } from './mdc-web-component';

export abstract class ComponentElement<T extends MDCWebComponentBase> extends LitElement {
  
 protected _componentRoot: Element | null = null;
 protected _component?: T;
 protected _resolveComponentPromise?: (value?: {} | PromiseLike<any>) => void;
 protected _componentPromise?: Promise<any>;
 static get ComponentClass(): any {
    throw new Error('Must provide component class');
  }

  static readonly componentSelector: string = '';

  constructor() {
    super();    
  }

  firstUpdated(_changedProperties: PropertyValues) {
    
    this._makeComponent();
  }

  protected _makeComponent() {
    this._componentRoot = this.shadowRoot!.querySelector((this.constructor as typeof ComponentElement).componentSelector);
    this._component = new ((this.constructor as typeof ComponentElement).ComponentClass)(this._componentRoot);
    if (this._resolveComponentPromise) {
      this._resolveComponentPromise(this._component);
    }
  }

  componentReady() {
    if (!this._componentPromise) {
      this._componentPromise = new Promise((resolve) => {
        this._resolveComponentPromise = resolve;
      });
      if (this._component) {
        this._resolveComponentPromise!(this._component);
      }
    }
    return this._componentPromise;
  }
}
