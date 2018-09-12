import { MDCList } from "@material/list";
import { MDCComponent, MDCFoundation, MDCStrings } from "@material/base";
import createFocusTrap from 'focus-trap';

export declare module '@material/drawer' {

  declare const cssClasses = {
    ROOT = 'mdc-drawer',
    DISMISSIBLE: string = 'mdc-drawer--dismissible',
    MODAL: string = 'mdc-drawer--modal',
    OPEN: string = 'mdc-drawer--open',
    ANIMATE: string = 'mdc-drawer--animate',
    OPENING: string = 'mdc-drawer--opening',
    CLOSING: string = 'mdc-drawer--closing',
  }


  declare const strings = {
    APP_CONTENT_SELECTOR: string = '.mdc-drawer-app-content',
    SCRIM_SELECTOR: string = '.mdc-drawer-scrim',
    CLOSE_EVENT: string = 'MDCDrawer:closed',
    OPEN_EVENT: string = 'MDCDrawer:opened'
  }

  declare interface MDCDrawerAdapter {
    addClass: (className: string) => void;
    removeClass: (className: string) => void;
    hasClass: (className: string) => boolean;
    elementHasClass: (element: Element, className: string) => boolean;
    computeBoundingRect: () => {};
    notifyClose: () => {};
    notifyOpen: () => {};
    saveFocus: () => {};
    restoreFocus: () => {};
    focusActiveNavigationItem: () => {};
    trapFocus: () => {};
    releaseFocus: () => {};
  }

  declare class MDCDismissibleDrawerFoundation extends MDCFoundation<MDCDrawerAdapter> {

    static readonly strings = {
      ...strings,
      DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
      OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
      FOCUSABLE_ELEMENTS: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]',
      OPEN_EVENT: 'MDCTemporaryDrawer:open',
      CLOSE_EVENT: 'MDCTemporaryDrawer:close',
    };
    static readonly cssClasses = {
      ...cssClasses,
      ANIMATING: 'mdc-drawer--animating',
      SCROLL_LOCK: 'mdc-drawer-scroll-lock'
    };
    static readonly defaultAdapter: MDCDrawerAdapter;

    /**
     * Function to open the drawer.
     */
    open(): void;

    /**
     * Function to close the drawer.
     */
    close(): void;

    /**
     * Extension point for when drawer finishes open animation.
     * @protected
     */
    protected opened(): void;

    /**
     * Extension point for when drawer finishes close animation.
     * @protected
     */
    protected closed(): void;

    /**
     * Returns true if drawer is in open state.
     */
    isOpen(): boolean;

    /**
     * Returns true if drawer is animating open.
     */
    isOpening(): boolean;

    /**
     * Returns true if drawer is animating closed.     
     */
    isClosing(): boolean;

    /**
     * Keydown handler to close drawer when key is escape.
     */
    handleKeydown(evt: KeyboardEvent): void;

    /**
     * Handles a transition end event on the root element.
     */
    handleTransitionEnd(evt: Event): void;
  }

  declare class MDCModalDrawerFoundation extends MDCDismissibleDrawerFoundation {
    /**
     * Called when drawer finishes open animation.
     * @override
     */
    opened(): void;

    /**
     * Called when drawer finishes close animation.
     * @override
     */
    closed(): void;

    /**
     * Handles click event on scrim.
     */
    handleScrimClick(): void;
  }

  declare class MDCDrawer extends MDCComponent<MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation> {

    constructor(...args: any[])

    static attachTo(root: Element): MDCDrawer;

    /**
     * Returns true if drawer is in the open position.    
     */
    get open(): boolean;

    /**
     * Toggles the drawer open and closed.
     * @param {boolean} isOpen
     */
    set open(isOpen: boolean): void;

    initialize(
      focusTrapFactory: any,// = createFocusTrap,
      listFactory: (el: Element) => MDCList): void;

    initialSyncWithDOM(): void;

    destroy(): void;
  }
}