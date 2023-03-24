/* from https://github.com/theKashey/dom-focus-lock/blob/808f2e9ac6e1e8f41f987b48942b86269ad6b805/src/index.js */
import moveFocusInside, { focusInside, focusIsHidden } from "focus-lock";

let lastActiveTrap: HTMLElement | null = null;
let lastActiveFocus: Element | null = null;

const focusOnBody = () => document && document.activeElement === document.body;

const isFreeFocus = () => focusOnBody() || focusIsHidden();

const activateTrap = () => {
  if (lastActiveTrap) {
    const observed = lastActiveTrap;
    if (!isFreeFocus()) {
      if (observed && !focusInside(observed)) {
        moveFocusInside(observed, lastActiveFocus!);
      }
      lastActiveFocus = document.activeElement;
    }
  }
};

const reducePropsToState = (propsList: Array<HTMLElement>) => {
  return propsList.filter((node) => node).slice(-1)[0];
};

const handleStateChangeOnClient = (trap: HTMLElement) => {
  lastActiveTrap = trap;
  if (trap) {
    activateTrap();
  }
};

let instances: Array<HTMLElement> = [];

const emitChange = (event?: Event) => {
  handleStateChangeOnClient(reducePropsToState(instances));
  event?.preventDefault();
};

const attachHandler = () => {
  document.addEventListener("focusin", emitChange);
};

const detachHandler = () => {
  document.removeEventListener("focusin", emitChange);
};

const focusTrap = {
  on(domNode: HTMLElement) {
    if (instances.length === 0) {
      attachHandler();
    }
    if (instances.indexOf(domNode) < 0) {
      instances.push(domNode);
      emitChange();
    }
  },

  off(domNode: HTMLElement) {
    instances = instances.filter((node) => node !== domNode);
    emitChange();
    if (instances.length === 0) {
      detachHandler();
    }
  },
};

export default focusTrap;
