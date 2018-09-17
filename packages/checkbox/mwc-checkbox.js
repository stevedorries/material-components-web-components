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
import { style } from './mwc-checkbox-css';
import { MDCCheckbox } from '@material/checkbox';
import { LitElement, html } from '@polymer/lit-element';
export class Checkbox extends LitElement {
    componentReady() {
    }
    static get ComponentClass() {
        return MDCCheckbox;
    }
    static get componentSelector() {
        return '.mdc-checkbox';
    }
    static get properties() {
        return {
            checked: { type: Boolean },
            indeterminate: { type: Boolean },
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
        this.indeterminate = false;
        this.disabled = false;
        this.value = '';
        this._boundInputChangeHandler = this._inputChangeHandler.bind(this);
    }
    // TODO(sorvell) #css: add outline none to avoid focus decoration
    renderStyle() {
        return style;
    }
    render() {
        const { checked, value } = this;
        return html `
       ${this.renderStyle()}
      <!-- Style should be above this comment -->
      <div class="mdc-checkbox">
        <input type="checkbox" class="mdc-checkbox__native-control" checked="${checked}" value="${value}" @change="${this._boundInputChangeHandler}">
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
      </div>`;
    }
    firstUpdated() {
        this._formElement = this.shadowRoot.querySelector(FormElement.formElementSelector);
        this._componentRoot = this.shadowRoot.querySelector(Checkbox.componentSelector);
        this._component = new (Checkbox.ComponentClass)(this._componentRoot);
    }
    _inputChangeHandler(e) {
        this.checked = e.target.checked;
    }
}
customElements.define('mwc-checkbox', Checkbox);
