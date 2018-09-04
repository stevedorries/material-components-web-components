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
import {LitElement, html, property} from '@polymer/lit-element/lit-element.js';
import {findAssignedNode} from '@material/mwc-base/utils.js';
import {FormElement} from '@material/mwc-base/formable-element.js';
import {style} from './mwc-formfield-css.js';
import {MDCFormFieldFoundation} from '@material/form-field';

export class Formfield extends LitElement {

  @property()
  label = '';
  @property({type: Boolean})
  alignEnd  = false;

  private _foundation: MDCFormFieldFoundation|undefined;

  protected renderStyle() {
    return style;
  }

  render() {
    const {label, alignEnd} = this;
    return html`${this.renderStyle()}
      <div class="mdc-form-field ${alignEnd ? 'mdc-form-field--align-end' : ''}">
        <slot></slot>
        <label @click="${() => this._labelClickHandler()}">${label}</label>
      </div>`;
  }

  firstRendered() {
    const label = this.shadowRoot.querySelector('label');
    this._foundation = new MDCFormFieldFoundation({
      registerInteractionHandler: (type, handler) => label.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => label.removeEventListener(type, handler),
      activateInputRipple: () => {
        if (this._input && this._input.ripple) {
          this._input.ripple.activate();
        }
      },
      deactivateInputRipple: () => {
        if (this._input && this._input.ripple) {
          this._input.ripple.deactivate();
        }
      },
    });
  }

  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has('label') && this._input) {
      if (this._input.localName == 'input') {
        this._input.setAttribute('aria-label', this.label);
      } else if (this._input instanceof FormElement) {
        this._input.updateComplete.then(() => {
          this._input.setAriaLabel(this.label);
        });
      }
    }
  }

  private _labelClickHandler() {
    if (this._input) {
      this._input.focus();
      this._input.click();
    }
  }

  private get _input() {
    return this.__input = this.__input ||
      findAssignedNode(this.shadowRoot.querySelector('slot'), '*');
  }
}

customElements.define('mwc-formfield', Formfield);
