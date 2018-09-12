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
import {LitElement, html} from '@polymer/lit-element';
import { classString } from "@polymer/lit-element/lib/render-helpers";
import {style} from './mwc-fab-css.js';
import {MDCRipple, attachRipple, RippleCapableComponent} from '@material/mwc-ripple';
import {afterNextRender} from '@material/mwc-base/utils';
import '@material/mwc-icon/mwc-icon-font.js';

export class Fab extends LitElement implements RippleCapableComponent {

  private _ripple?: MDCRipple | null = null;
  icon: string;
  mini: boolean;
  exited: boolean;
  label: string;
  _root: HTMLElement | null = null;
  disabled: boolean;

  static get properties() {
    return {
      mini: {type: Boolean},
      exited: {type: Boolean},
      disabled: {type: Boolean},
      icon: {type: String},
      label: {type: String},
    };
  }

  constructor() {
    super();
    this.icon = '';
    this.mini = false;
    this.exited = false;
    this.disabled = false;
    this.label = '';
  }

  createRenderRoot() {
    return this.attachShadow({mode: 'open', delegatesFocus: true});
  }

  async firstRendered() {
    await afterNextRender();
    const container = this.parentElement || this;
    // TODO(sorvell) #css: this might be bad since the container might be positioned.
    container.style.position = 'relative';
    this._root = this.shadowRoot!.querySelector('.mdc-button');
    this._ripple = attachRipple(this, this._root, container);
    //this._ripple = new MDCWCRipple(this.shadowRoot.querySelector('.mdc-fab'));
  }

  renderStyle() {
    return style;
  }

  render() {
    const {icon, mini, exited, disabled, label} = this;
    const hostClasses = classString({
      'mdc-fab--mini': mini,
      'mdc-fab--exited': exited,
    });
    return html`
      ${this.renderStyle()}
      <button class="mdc-fab ${hostClasses}" ?disabled="${disabled}" aria-label="${label || icon}">
        ${icon ? html`<span class="material-icons mdc-fab__icon">${icon}</span>` : ''}
      </button>`;
  }
}

customElements.define('mwc-fab', Fab);
