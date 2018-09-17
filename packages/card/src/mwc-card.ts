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
import {style} from './mwc-card-css';

export class Card extends LitElement {
  stroke: boolean;
  static get properties() {
    return {
      stroke: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.stroke = false;
  }

  renderStyle() {
    return style;
  }

  render() {
    return html`
      ${this.renderStyle()}
      <div class="mdc-card ${this.stroke ? 'mdc-card--stroked' : ''}">
        <slot></slot>
      </div>`;
  }
}
export class MwcCard extends LitElement {
  stroke: boolean;
  static get properties() {
    return {
      stroke: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.stroke = false;
  }

  renderStyle() {
    return style;
  }

  render() {
    const { stroke } = this;
    return html`
      ${ this.renderStyle()}      
      <div class$="mdc-card ${stroke ? 'mdc-card--stroked' : ''}">
        <div class="mdc-card__media mdc-card__media--square">
          <div class="mdc-card__media-content"><slot name="title">Title</slot></div>
        </div>
        <slot name="content"></slot>
        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
          <slot name="actionButtons"></slot>
          </div>
          <div class="mdc-card__action-icons">
          <slot name="actionIcons"></slot>
          </div>
        </div>
      </div>`;
  }
}

customElements.define('mwc-card', Card);
