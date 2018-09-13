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
//import { FormElement } from '@material/mwc-base/form-element';
import { style } from './mwc-radio-css';
import { RadioGroupController } from './radio-controller';
import { MDCRadio } from '@material/radio';
import { LitElement, html, PropertyValues } from '@polymer/lit-element';
import { ComponentElement, MDCWebComponentMixin } from '@material/mwc-base/component-element';
const MWCRadio = MDCWebComponentMixin(MDCRadio);
export class Radio extends LitElement {
  value?: string;
  _boundInputChangeHandler: any;
  _boundInputFocusHandler: any;
  _boundInputBlurHandler: any;
  _radioGroupController?: RadioGroupController | null = null;  
  checked: boolean = false;
  name: string;
  disabled: boolean;
  _componentRoot: any;
  _component?:MDCRadio;
  _boundInputClickHandler: any;
  static get ComponentClass() {
    return MWCRadio;
  }

  static get componentSelector() {
    return '.mdc-radio';
  }

  static get properties() {
    return {
      checked: { type: Boolean, attribute: true, reflect: true },
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
    this._boundInputClickHandler = this._inputClickHandler.bind(this);
    this._boundInputChangeHandler = this._inputChangeHandler.bind(this);
    this._boundInputFocusHandler = this._inputFocusHandler.bind(this);
    this._boundInputBlurHandler = this._inputBlurHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._radioGroupController = RadioGroupController.getController(this);
    this._radioGroupController!.register(this);
    this._radioGroupController!.update(this);
  }

  disconnectedCallback() {
    this._radioGroupController!.unregister(this);
  }

  renderStyle() {
    return style;
  }

  render() {
    const { checked, value, name, disabled } = this;
    return html`
       ${this.renderStyle()}
      <div class="mdc-radio ${disabled ? " mdc-radio--disabled " : " "}" @focus="${this._boundInputFocusHandler}" @blur="${this._boundInputBlurHandler}">
        <input class="mdc-radio__native-control" ?checked="${checked}" ?disabled="${disabled}" type="radio" name="${name}" @click="${this._boundInputClickHandler}"
          @input="${this._boundInputChangeHandler}">
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

  updated(changedProperties: PropertyValues) {
    this.input!.checked = this.checked;
  }
  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    // this._componentRoot = this.shadowRoot!.querySelector(Radio.componentSelector);
    // this._component = new MDCRadio(this._componentRoot);
    // this._component.checked = false;
    this.input = this.shadowRoot!.querySelector('input');
  }
  _inputClickHandler(e) {
    console.log("Clicked " + this.id + ": e=" + e.target.checked + ` this=${this.checked} component=${this._component ? this._component.checked : 'undefined'}`);
    console.log(e);
    // this._component.checked = e.target.checked;
    this.checked = e.target.checked || false;//this._component.checked;
    this._radioGroupController!.update(this);
  }
  _inputChangeHandler(e) {
    console.log("Input " + this.id + ": e=" + e.target.checked + ` this=${this.checked} component=${this._component ? this._component.checked : 'undefined'}`);
    console.log(e);
    // this._component.checked = e.target.checked || false;
    // this.checked = e.target.checked || false;//this._component.checked;
    //this._radioGroupController!.update(this);
  }
  private input: HTMLInputElement | null = null;
  _inputFocusHandler(e: FocusEvent) {
    console.log("Focus " + this.id + ": e=" + (<any>e.target!).checked + ` this=${this.checked} component=${this._component ? this._component.checked : 'undefined'}`);
    console.log(e);
    if (e.target !== this.input) return;
    // if(e.relatedTarget instanceof Radio && e.relatedTarget.name == this.name)
    //   e.relatedTarget.checked = false;

    //this.input!.focus();
    // this.input!.click();    
  }

  _inputBlurHandler(e) {
    console.log("Blur " + this.id + ": e=" + e.target.checked + ` this=${this.checked} component=${this._component ? this._component.checked : 'undefined'}`);
    console.log(e);
    this.input!.blur();
  }

}

customElements.define('mwc-radio', Radio);
