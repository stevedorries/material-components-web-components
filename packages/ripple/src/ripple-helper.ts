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

import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import * as util from '@material/ripple/util';

const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

const supportsCssVariables = util.supportsCssVariables(window);

type Handler = EventListenerOrEventListenerObject;

export function attachRipple(instance: RippleCapableComponent, rippleSurface?: HTMLElement | null, interactionNode?: HTMLElement | null) {

  const rootNode = instance._root;

  if (!rippleSurface) {
    rippleSurface = rootNode;
  }
  if (!interactionNode) {
    interactionNode = rootNode;
  }

  const adapter = {
    browserSupportsCssVars: () => supportsCssVariables,
    isUnbounded: () =>
      instance.unbounded === undefined ? true : instance.unbounded,
    isSurfaceActive: () => interactionNode![MATCHES](':active'),
    isSurfaceDisabled: () => instance.disabled,
    addClass: (className: string) => rippleSurface!.classList.add(className),
    removeClass: (className: string) =>
      rippleSurface!.classList.remove(className),
    containsEventTarget: (target: HTMLElement) => rootNode!.contains(target),
    registerInteractionHandler: (type: string, handler: Handler) =>
      interactionNode!.addEventListener(type, handler, util.applyPassive()),
    deregisterInteractionHandler: (type: string, handler: Handler) =>
      interactionNode!.removeEventListener(type, handler, util.applyPassive()),
    registerDocumentInteractionHandler: (evtType: string, handler: Handler) =>
      document.documentElement.addEventListener(
        evtType, handler, util.applyPassive()),
    deregisterDocumentInteractionHandler: (evtType: string, handler: Handler) =>
      document.documentElement.removeEventListener(
        evtType, handler, util.applyPassive()),
    registerResizeHandler: (handler: Handler) =>
      window.addEventListener('resize', handler),
    deregisterResizeHandler: (handler: Handler) =>
      window.removeEventListener('resize', handler),
    updateCssVariable: (varName: string, value: string) =>
      rippleSurface!.style.setProperty(varName, value),
    computeBoundingRect: () => rippleSurface!.getBoundingClientRect(),
    getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset }),
  };
  const foundation = new MDCRippleFoundation(adapter);
  return new MDCRipple(rootNode, foundation);
}

export interface RippleCapableComponent {
  _root?: HTMLElement | null;
  unbounded?: boolean;
  disabled?: boolean;
}