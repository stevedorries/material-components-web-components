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
import {LitElement, html, property, PropertyValues} from '@polymer/lit-element/lit-element.js';
import {MDCRipple} from '@material/ripple';
import {attachRipple, RippleCapableComponent} from "./ripple-helper.js";
import {style} from './mwc-ripple-css.js';

export class Ripple extends LitElement implements RippleCapableComponent {
  @property({type: Boolean})
  primary = false;

  @property({type: Boolean})
  accent = false;

  @property({type: Boolean})
  unbounded = false;

  private _ripple: MDCRipple | null = null;
  _root: HTMLElement | null = null;

  renderStyle() {
    return style;
  }

  private _classString(className: string, on: boolean) {
    return on ? 'mdc-ripple-surface--' + className : '';
  }

  // TODO(sorvell) #css: sizing.
  render() {
    const {primary, accent, unbounded} = this;
    const colorClass = this._classString('primary', primary) || this._classString('accent', accent);
    return html`
      ${this.renderStyle()}
      <div class="mdc-ripple-surface ${colorClass}" ?data-mdc-ripple-is-unbounded="${unbounded}"></div>`;
  }

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (changedProperties.has('unbounded')) {
      this._ripple.unbounded = this.unbounded;
    }
  }

  firstRendered() {
    const container = this.parentElement || this;
    // TODO(sorvell) #css: this might be bad since the container might be positioned.
    container.style.position = 'relative';
    this._root = this.shadowRoot!.querySelector('.mdc-ripple-surface');
    this._ripple = attachRipple(this, this._root, container);
  }

  activate() {
    this._ripple!.activate();
  }

  deactivate() {
    this._ripple!.deactivate();
  }

  layout() {
    this._ripple!.layout();
  }
}

customElements.define('mwc-ripple', Ripple);
