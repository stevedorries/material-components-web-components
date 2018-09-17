import { Radio } from "./mwc-radio";

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


interface RadioSet extends Set<Radio> {
    selected: Radio | null;
    ordered: Array<Radio> | null;
}

export class RadioGroupController {
    protected sets: Map<String, RadioSet>;
    protected _property: string;
    protected _keyIsDown: boolean = false;
    protected _mouseIsDown: boolean = false;
    protected _blurRaf: any;
    protected _focusedSet: RadioSet | null = null;
    protected _updating: boolean = false;

    /**
     * 
     *
     * @static
     * @param {Radio} element
     * @returns {RadioGroupController}
     * @memberof RadioGroupController
     */
    static getController(element: any): RadioGroupController | null{
        const root = element.getRootNode();
        if (root) {
            if (!root.__RadioGroupController) {
                root.__RadioGroupController = new RadioGroupController(root);
            }
            return root.__RadioGroupController;
        }
        else
            return null;
    }

    constructor(node: HTMLElement) {
        node.addEventListener<'keydown'>('keydown', (e:KeyboardEvent) => this._keyDownHandler(e));
        node.addEventListener('mousedown', (e:MouseEvent) => this._mousedownHandler(e));
        node.addEventListener('mouseup', (e:MouseEvent) => this._mouseupHandler(e));
        this.sets = new Map();
        this._property = 'checked';
    }

    _keyDownHandler(e: KeyboardEvent) {
        this._keyIsDown = true;
        const element:Radio = <any>e.target;
        if (!this.has(element)) {
            return;
        }
        if (e.key == 'ArrowRight' || e.key == 'ArrowDown') {
            this.next(element);
        } else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
            this.previous(element);
        }
    }

    _mousedownHandler(e:MouseEvent) {
        this._mouseIsDown = true;
    }

    _mouseupHandler(e:MouseEvent) {
        this._mouseIsDown = false;
    }

    has(element:Radio):boolean {
        const set = this.getSet(element.name);
        return set.has(element);
    }

    previous(element:Radio) {
        const order = this.getOrdered(element);
        const i = order.indexOf(element);
        this.select(order[i - 1] || order[order.length - 1]);
    }

    next(element:Radio) {
        const order = this.getOrdered(element);
        const i = order.indexOf(element);
        this.select(order[i + 1] || order[0]);
    }

    select(element:Radio) {
        element.focus();
        element.click();
    }

    /**
     * Helps to track the focused selection group and if it changes, focuses
     * the selected item in the group. This matches native radio button behavior.
     * @param {*} event
     * @param {*} element
     */
    focus(event:FocusEvent, element:Radio) {
        // Only manage focus state when using keyboard
        if (this._mouseIsDown) {
            return;
        }
        cancelAnimationFrame(this._blurRaf);
        const set = this.getSet(element.name);
        const currentFocusedSet = this._focusedSet;
        this._focusedSet = set;
        if (currentFocusedSet != set && set.selected && set.selected != element) {
            // TODO(sorvell): needed because MDC Ripple delays focus/blur until RAF.
            requestAnimationFrame(() => {
                set.selected!.focus();
            });
        }
    }

    /**
     * Helps track the focused selection group by setting it to null asynchronously
     * on blur if no focus event is received.
     * @param {*} element
     */
    blur(element:Radio) {
        // Only manage focus state when using keyboard
        if (this._mouseIsDown) {
            return;
        }
        this._blurRaf = requestAnimationFrame(() => {
            this._focusedSet = null;
        });
    }

    getOrdered(element:Radio): Radio[] {
        const set = this.getSet(element.name);
        if (!set.ordered) {
            set.ordered = new Array<Radio>();
            for (const e of set) {
                set.ordered.push(e);
            }
            set.ordered.sort((a: Radio, b: Radio) =>
                a.compareDocumentPosition(b) == Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
            );
        }
        return set.ordered;
    }

    getSet(name: string): RadioSet {
        if (!this.sets[name]) {
            this.sets[name] = new Set<Radio>();
        }
        return this.sets[name];
    }

    register(element:Radio) {
        const set = this.getSet(element.name);
        set.add(element);
        set.ordered = null;
    }

    unregister(element:Radio) {
        const set = this.getSet(element.name);
        set.delete(element);
        set.ordered = null;
        if (set.selected == element) {
            set.selected = null;
        }
    }

    update(element:Radio) {
        if (this._updating) {
            return;
        }
        this._updating = true;
        if (element.checked) {
            const set = this.getSet(element.name);
            set.forEach((e) => { 
                let newValue = (e === element) ? true:false; 
                e.checked = newValue;
            });
            //for (const e of set) {
            //    e.checked = (e == element);
            //}
            set.selected = element;
        }
        this._updating = false;
    }
}
