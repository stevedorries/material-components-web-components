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
import { style } from './mwc-icon-toggle-css';
import { MDCIconToggle } from '@material/icon-toggle';
import '@material/mwc-icon/mwc-icon-font';
import { LitElement, html } from '@polymer/lit-element';

export class IconToggle extends LitElement {
  icon: string;
  offIcon: string;
  label: string;
  offLabel: string;
  disabled: boolean;
  on: boolean;
  _boundChangeHandler: any;
  static get ComponentClass() {
    return MDCIconToggle;
  }

  static get componentSelector() {
    return '.mdc-icon-toggle';
  }

  static get properties() {
    return {
      disabled: { type: Boolean },
      on: { type: Boolean },
      icon: { type: String },
      offIcon: { type: String },
      label: { type: String },
      offLabel: { type: String }
    };
  }

  constructor() {
    super();
    this.icon = '';
    this.offIcon = '';
    this.label = '';
    this.offLabel = '';
    this.disabled = false;
    this.on = false;
    this._boundChangeHandler = this._changeHandler.bind(this);
  }

  static get formElementSelector() {
    return '.mdc-icon-toggle';
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  renderStyle() {
    return style;
  }

  // TODO(sorvell) #css: added display
  render() {
    const { disabled, icon, offIcon, label, offLabel } = this;
    return html`
       ${style}
      <span class="mdc-icon-toggle material-icons ${disabled ? 'mdc-icon-toggle--disabled' : ''}" role="button" aria-disabled="${disabled}"
        tabindex="0" data-toggle-on='{"label": "${label}", "content": "${icon}"}' data-toggle-off='{"label": "${offLabel}", "content": "${offIcon || icon}"}'
        @MDCIconToggle:change="${this._boundChangeHandler}">
      </span>`;
  }

  _changeHandler(e) {
    this.on = e.detail.isOn;
  }
}

customElements.define('mwc-icon-toggle', IconToggle);
