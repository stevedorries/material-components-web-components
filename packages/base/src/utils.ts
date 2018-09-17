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
import {LitElement} from "@polymer/lit-element";
function isCustomElementCandidate(element: HTMLElement) {
  return element.localName!.match('-');
}

export async function callWhenReady(element:HTMLElement, method:string, ...args: any[]) {
  if (!element[method] && isCustomElementCandidate(element) && !customElements.get(element.localName!)) {
    await customElements.whenDefined(element.localName!);
  }
  if (element[method]) {
    element[method](...args);
  }
}

let afterRenderPromise: Promise<{}> | null;
export function afterNextRender(): Promise<any> {
  if (!afterRenderPromise) {
    afterRenderPromise = new Promise((resolve) => {
      requestAnimationFrame(() => setTimeout(() => {
        afterRenderPromise = null;
        resolve();
      }));
    });
  }
  return afterRenderPromise;
}

export function findAssignedNode(slot:HTMLSlotElement, selector:string):Element {  
  return <Element>slot.assignedNodes({flatten: true}).find((value:Node) => {
    return !(value instanceof LitElement) && (value instanceof Element) && value.matches(selector);
  });
}
