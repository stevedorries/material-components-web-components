import { style } from './mwc-radio-css';
import { SelectionController } from '@material/mwc-base/selection-controller.js';
import { MDCRadio } from '@material/radio';
import { LitElement, html } from '@polymer/lit-element';
export class Radio extends LitElement {
    constructor() {
        super();
        this.input = null;
        this.checked = false;
        this.disabled = false;
        this.name = '';
        this.value = '';
        this._boundInputChangeHandler = this._inputChangeHandler.bind(this);
        this._boundInputFocusHandler = this._inputFocusHandler.bind(this);
        this._boundInputBlurHandler = this._inputBlurHandler.bind(this);
    }
    static get ComponentClass() {
        return MDCRadio;
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
    connectedCallback() {
        //   super.connectedCallback();
        this._selectionController = SelectionController.getController(this);
        this._selectionController.register(this);
        this._selectionController.update(this);
    }
    disconnectedCallback() {
        //  this._selectionController.unregister(this);
    }
    renderStyle() {
        return style;
    }
    render() {
        const { checked, value, name, disabled } = this;
        return html `
       ${this.renderStyle()}
      <!-- Style should be above this comment -->
      <div class="mdc-radio ${disabled ? " mdc-radio--disabled " : ""}">
        <input class="mdc-radio__native-control" ?checked="${checked}" ?disabled="${disabled}" type="radio" name="${name}"
          @change="${this._boundInputChangeHandler}" @focus="${this._boundInputFocusHandler}" @blur="${this._boundInputBlurHandler}">
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
    firstUpdated() {
        this._componentRoot = this.shadowRoot.querySelector(Radio.componentSelector);
        this._component = new (Radio.ComponentClass)(this._componentRoot);
        this.input = this.shadowRoot.querySelector('input');
    }
    _inputChangeHandler(e) {
        console.log(this.id + ": checked=" + e.target.checked);
        this._component.checked = e.target.checked;
        this.checked = this._component.checked;
    }
    _inputFocusHandler(e) {
        this.input.focus();
        this.input.click();
        this.checked = !this.checked;
    }
    _inputBlurHandler(e) {
        this.input.blur();
    }
}
customElements.define('mwc-radio', Radio);
//# sourceMappingURL=mwc-radio.js.map