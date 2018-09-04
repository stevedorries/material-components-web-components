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
import { classString } from '@polymer/lit-element/lib/render-helpers';
import { style } from './mwc-button-css';
import { MDCRipple } from '@material/ripple';
import { attachRipple, RippleCapableComponent } from "@material/mwc-ripple";
import '@material/mwc-icon/mwc-icon-font.js';

export class Button extends LitElement implements RippleCapableComponent {
  raised: boolean;
  unelevated: boolean;
  outlined: boolean;
  dense: boolean;
  disabled: boolean;
  unbounded: boolean = false;
  icon: string;
  label: string;
  private _ripple?: MDCRipple | null = null;
  _root: HTMLElement | null = null;

  static get properties() {
    return {
      raised: { type: Boolean },
      unelevated: { type: Boolean },
      unbounded: { type: Boolean },
      outlined: { type: Boolean },
      dense: { type: Boolean },
      disabled: { type: Boolean },
      icon: { type: String },
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.raised = false;
    this.unelevated = false;
    this.outlined = false;
    this.dense = false;
    this.disabled = false;
    this.icon = '';
    this.label = '';
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstRendered() {
    const container = this.parentElement || this;
    // TODO(sorvell) #css: this might be bad since the container might be positioned.
    container.style.position = 'relative';
    this._root = this.shadowRoot!.querySelector('.mdc-button');
    this._ripple = attachRipple(this, this._root, container);
  }


  // async firstRendered() {
  //   await afterNextRender();
  //   this._ripple = new MDCWCRipple(this.shadowRoot!.querySelector('.mdc-button'));
  // }

  renderStyle() {
    return style;
  }

  render() {
    const { raised, unelevated, outlined, dense, disabled, icon, label } = this;
    const hostClasses = classString({
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'mdc-button--outlined': outlined,
      'mdc-button--dense': dense,
    });
    return html`
      ${this.renderStyle()}
      <button class="mdc-button ${hostClasses}" ?disabled="${disabled}">
        ${icon ? html`<span class="material-icons mdc-button__icon">${icon}</span>` : ''}
        ${label || ''}
        <slot></slot>
      </button>`;
  }
}

customElements.define('mwc-button', Button);
