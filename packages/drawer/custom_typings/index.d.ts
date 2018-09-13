import { MDCList } from "@material/list";
import { MDCComponent, MDCFoundation, MDCStrings } from "@material/base";
import createFocusTrap from 'focus-trap';



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
  /** 
   * Adds a class to the root element.
   *
   * @param {string} className
   * @memberof MDCDrawerAdapter
   */
  addClass(className: string): void;
  /**
   * Returns true if the root element contains the given className.
   *
   * @param {string} className
   * @returns {boolean}
   * @memberof MDCDrawerAdapter
   */
  hasClass(className: string): boolean;
  /**
   *Removes a class from the root element.
   *
   * @param {string} className
   * @memberof MDCDrawerAdapter
   */
  removeClass(className: string): void;
  /**
   *	Returns true if the an element contains the given class.
   *
   * @param {Element} element
   * @param {string} className
   * @returns {boolean}
   * @memberof MDCDrawerAdapter
   */
  elementHasClass(element: Element, className: string): boolean;
  /**
   *Returns the ClientRect for the root element.
   *
   * @returns {ClientRect}
   * @memberof MDCDrawerAdapter
   */
  computeBoundingRect(): ClientRect;
  /**
   * Saves the focus of currently active element.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  saveFocus(): void;
  /**
   * Restores focus to element previously saved with ‘saveFocus’.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  restoreFocus(): void;
  /**
   * Focuses the active / selected navigation item.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  focusActiveNavigationItem(): void;
  /**
   * Emits the MDCDrawer:closed event.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  notifyClose(): void;
  /**
   * Emits the MDCDrawer:opened event.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  notifyOpen(): void;
  /**
   * Traps focus on root element and focuses the active navigation element.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  trapFocus(): void;
  /**
   * Releases focus trap from root element which was set by trapFocus and restores focus to where it was prior to calling trapFocus.
   * 
   * @returns {void}
   * @memberof MDCDrawerAdapter
   */
  releaseFocus(): void;
  hasNecessaryDom?:boolean;
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
    focusTrapFactory = createFocusTrap,
    listFactory: (el: Element) => MDCList): void;

  initialSyncWithDOM(): void;

  destroy(): void;
}
