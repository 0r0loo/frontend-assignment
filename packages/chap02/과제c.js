import { createHooks } from './hooks';
import { render as updateElement } from './render';

function MyReact() {
  let rootElement = null;
  let _rootComponent = null;
  let prevRootComponent = null;
  const _render = () => {
    resetHookContext();
    const newElement = _rootComponent();

    updateElement(rootElement, newElement, prevRootComponent);
    prevRootComponent = newElement;
  };
  function render($root, rootComponent) {
    resetHookContext();
    rootElement = $root;
    _rootComponent = rootComponent;
    const newElement = rootComponent();

    updateElement($root, newElement);
    prevRootComponent = newElement;
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
