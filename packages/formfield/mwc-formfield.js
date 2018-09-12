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
import { LitElement, html } from '@polymer/lit-element';
import { findAssignedNode } from '@material/mwc-base/utils';
import { style } from './mwc-formfield-css';
import { MDCFormField } from '@material/form-field';
export class Formfield extends LitElement {
    constructor() {
        super();
        this.label = '';
        this.alignEnd = false;
        this.__input = null;
        this._boundLabelClickHandler = this._labelClickHandler.bind(this);
    }
    static get ComponentClass() {
        return MDCFormField;
    }
    static get componentSelector() {
        return '.mdc-form-field';
    }
    static get properties() {
        return {
            alignEnd: { type: Boolean },
            label: { type: String },
        };
    }
    renderStyle() {
        return style;
    }
    render() {
        const { label, alignEnd } = this;
        return html `${this.renderStyle()}
<div class="mdc-form-field ${alignEnd ? 'mdc-form-field--align-end' : ''}">
  <slot></slot>
  <label @click="${this._boundLabelClickHandler}">${label}</label>
</div>`;
    }
    //
    _labelClickHandler() {
        if (this._input) {
            this._input.focus();
            this._input.click();
            this._input.blur();
        }
    }
    get _input() {
        if (this.__input)
            return this.__input;
        let slot = this.shadowRoot.querySelector('slot');
        let ___input = null;
        let nodes = slot.assignedNodes({ flatten: true });
        nodes.forEach(node => { if (node instanceof HTMLElement && node.shadowRoot)
            ___input = node.shadowRoot.querySelector('input'); });
        if (___input)
            return this.__input = ___input;
        return this.__input = slot ?
            findAssignedNode(slot, 'input') : null;
    }
}
customElements.define('mwc-formfield', Formfield);
//# sourceMappingURL=mwc-formfield.js.map