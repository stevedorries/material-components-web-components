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

import { style } from './mwc-switch-css';
import { MDCSwitch } from '@material/switch';
import { LitElement,html } from '@polymer/lit-element';

export class Switch extends LitElement {
  _asyncComponent: boolean;
  checked: boolean;
  value: string;
  _boundInputChangeHandler: any;
  _component: any;
  disabled: boolean;
  _formElement: any;
  _componentRoot: any;

  componentReady(): any {

  }
  static get ComponentClass() {
    return MDCSwitch;
  }

  static get componentSelector() {
    return '.mdc-switch';
  }

  static get properties() {
    return {
      checked: { type: Boolean },
      disabled: { type: Boolean },
      value: { type: String }
    };
  }

  // TODO(sorvell): need to add delegatesFocus to ShadyDOM. Using it here,
  // allows tabIndex order to be changed (note, > 0 is dubious but -1 seems useful)
  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  constructor() {
    super();
    this._asyncComponent = true;
    this.checked = false;
    this.disabled = false;
    this.value = '';
    this._boundInputChangeHandler = this._inputChangeHandler.bind(this);
  }

  // TODO(sorvell) #css: add outline none to avoid focus decoration
  renderStyle() {
    return style;
  }

  render() {
    const { checked, disabled } = this;
    return html`
       ${this.renderStyle()}
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" ?checked="${checked}" ?disabled="${disabled}" id="basic-switch" class="mdc-switch__native-control" role="switch"
              @change="${this._boundInputChangeHandler}">
          </div>
        </div>
      </div>
      <slot></slot>
      `;
  }
  firstUpdated(){
    this._componentRoot = this.shadowRoot!.querySelector(Switch.componentSelector);
    this._component = new (Switch.ComponentClass)(this._componentRoot);   
  }
  _inputChangeHandler(e) {
    this.checked = e.target.checked;
  }
}

customElements.define('mwc-switch', Switch);
