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
import { ComponentElement } from './component-element';
export { MDCWebComponentMixin } from './component-element';

export abstract class FormableComponentElement extends ComponentElement {
  protected _formElement: HTMLInputElement | null = null;

  static formElementSelector = "input";


  constructor() {
    super();
    this._asyncComponent = true;
  }

  async firstRendered() {
   // super.firstRendered();
    this._formElement = this.shadowRoot!.querySelector<HTMLInputElement>(FormableComponentElement.formElementSelector);
  }

  click() {
    if (this._formElement) {
      this._formElement.click();
    }
  }

  // TODO(srovell): use delegates focus?
  focus() {
    if (this._formElement) {
      this._formElement.focus();
    }
  }

  setAriaLabel(value: string) {
    if (this._formElement) {
      this._formElement.setAttribute('aria-label', value);
    }
  }
}
