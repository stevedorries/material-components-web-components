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
import {LitElement} from '@polymer/lit-element';
import { MDCWebComponentBase } from './mdc-web-component';
export { MDCWebComponentBase, MDCWebComponentMixin } from './mdc-web-component';
import { ComponentElement } from './component-element';


export abstract class FormElement<T extends MDCWebComponentBase> extends ComponentElement<T> {
  protected _formElement: HTMLInputElement | null = null;
  protected _ripple: any | null = null;
  protected _component?: T;
  protected _componentRoot: Element | null = null;
  static get formElementSelector():string {
    return 'input';
  }
  static readonly componentSelector:string = '';
  
  static get ComponentClass(): any {
    throw new Error('Must provide component class');
  }
  
  createRenderRoot() {
    return this.attachShadow({mode: 'open', delegatesFocus: true});
  }

  get ripple(): any {
    return this._ripple;
  }
  
  firstUpdated() {
    this._formElement = this.shadowRoot!.querySelector((this.constructor as typeof FormElement).formElementSelector);
    this._componentRoot = this.shadowRoot!.querySelector((this.constructor as typeof FormElement).componentSelector);
    this._component = new ((this.constructor as typeof FormElement).ComponentClass)(this._componentRoot);   
  }

  click() {
    if (this._formElement) {
      this._formElement.click();
    }
  }

  setAriaLabel(value:string) {
    if (this._formElement) {
      this._formElement.setAttribute('aria-label', value);
    }
  }
}
