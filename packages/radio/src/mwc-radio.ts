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
import { FormElement } from '@material/mwc-base/form-element';
import { style } from './mwc-radio-css';
import { SelectionController } from '@material/mwc-base/selection-controller.js';
import { MDCRadio } from '@material/radio';
import { LitElement,html } from '@polymer/lit-element';

export class Radio extends LitElement {
  value: string;
  _boundInputChangeHandler: any;
  _boundInputFocusHandler: any;
  _boundInputBlurHandler: any;
  _selectionController: any;
  checked: boolean;
  name: string;
  disabled: boolean;
  _componentRoot: any;
  _component: any;
  static get ComponentClass() {
    return MDCRadio;
  }

  static get componentSelector() {
    return '.mdc-radio';
  }

  static get properties() {
    return {
      checked: { type: Boolean, attribute:true, reflect:true },
      disabled: { type: Boolean },
      value: { type: String },
      name: { type: String }
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.name = '';
    this.value = '';
    this._boundInputChangeHandler = this._inputChangeHandler.bind(this);
    this._boundInputFocusHandler = this._inputFocusHandler.bind(this);
    this._boundInputBlurHandler = this._inputBlurHandler.bind(this);
  }

  connectedCallback() {
 //   super.connectedCallback();
    this._selectionController = SelectionController.getController(this);
    this._selectionController.register(this);
    this._selectionController.update(this);
  }

  disconnectedCallback() {
  //  this._selectionController.unregister(this);
  }

  renderStyle() {
    return style;
  }

  render() {
    const { checked, value, name, disabled } = this;
    return html`
       ${this.renderStyle()}
      <!-- Style should be above this comment -->
      <div class="mdc-radio ${disabled ? " mdc-radio--disabled " : ""}">
        <input class="mdc-radio__native-control" ?checked="${checked}" ?disabled="${disabled}" type="radio" name="${name}"
          @change="${this._boundInputChangeHandler}" @focus="${this._boundInputFocusHandler}" @blur="${this._boundInputBlurHandler}">
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
      </div>
  `;
    /*  <div class="mdc-radio">
        <input class="mdc-radio__native-control" type="radio" ${isDisabled} checked="${checked}" name="${name}" value="${value}"
          @change="${this._boundInputChangeHandler}" @focus="${this._boundInputFocusHandler}" @blur="${this._boundInputBlurHandler}">
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
      </div>`;*/
  }

  firstUpdated(){
    this._componentRoot = this.shadowRoot!.querySelector(Radio.componentSelector);
    this._component = new (Radio.ComponentClass)(this._componentRoot);   
    this.input = this.shadowRoot!.querySelector('input');
  }
  _inputChangeHandler(e) {
    console.log(this.id+": checked="+e.target.checked);
    this._component.checked = e.target.checked;
    this.checked = this._component.checked;
  }

  private input: HTMLInputElement | null = null;
  _inputFocusHandler(e) {
    this.input!.focus();
    this.input!.click();    
  }

  _inputBlurHandler(e) {
    this.input!.blur();
  }

}

customElements.define('mwc-radio', Radio);
