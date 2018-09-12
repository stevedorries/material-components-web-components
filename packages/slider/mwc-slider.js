import { LitElement, html } from '@polymer/lit-element';
import { classString } from "@polymer/lit-element/lib/render-helpers";
import { style } from './mwc-slider-css';
import { MDCSlider } from '@material/slider';
export class Slider extends LitElement {
    constructor() {
        super();
        this.value = 0;
        this.disabled = false;
        this.step = 0;
        this.min = 0;
        this.max = 10;
        this.value = 0;
        this.discrete = false;
        this.markers = false;
        this.label = '';
    }
    static get ComponentClass() {
        return MDCSlider;
    }
    static get componentSelector() {
        return '.mdc-slider';
    }
    static get properties() {
        return {
            disabled: { type: Boolean },
            step: { type: Number },
            min: { type: Number },
            max: { type: Number },
            value: { type: Number },
            discrete: { type: Boolean },
            markers: { type: Boolean },
            label: { type: String }
        };
    }
    static get formElementSelector() { return '.mdc-slider'; }
    firstUpdated() {
        this._componentRoot = this.shadowRoot.querySelector(Slider.componentSelector);
        this._component = new (Slider.ComponentClass)(this._componentRoot);
        this._componentRoot.addEventListener('MDCSlider:input', (e) => {
            this.value = e.detail.value;
        });
    }
    renderStyle() {
        return style;
    }
    // TODO(sorvell) #css: needs a default width
    render() {
        const { disabled, step, min, max, value, discrete, markers, label } = this;
        const hostClasses = classString({
            'mdc-slider--discrete': discrete,
            'mdc-slider--display-markers': markers && discrete,
        });
        return html `
       ${this.renderStyle()}
      <div class="mdc-slider ${hostClasses}" tabindex="0" role="slider" aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${value}"
        ?aria-disabled="${disabled}" data-step="${step}" aria-label="${label}">
        <div class="mdc-slider__track-container">
          <div class="mdc-slider__track"></div>
          ${discrete && markers ? html `
          <div class="mdc-slider__track-marker-container"></div>` : ''}
        </div>
        <div class="mdc-slider__thumb-container">
          ${discrete ? html `
          <div class="mdc-slider__pin">
            <span class="mdc-slider__pin-value-marker"></span>
          </div>` : ''}
          <svg class="mdc-slider__thumb" width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875"></circle>
          </svg>
          <div class="mdc-slider__focus-ring"></div>
        </div>
      </div>`;
    }
}
customElements.define('mwc-slider', Slider);
//# sourceMappingURL=mwc-slider.js.map