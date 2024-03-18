export function createHooks(callback) {
  const useState = (initState) => {
    return [
      initState,
      (nextState) => {
        if (initState === nextState) {
          return;
        }

        console.log('initState : ', initState);
        console.log('nextState : ', nextState);
        initState = nextState;

        callback();
      }
    ];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {};

  return { useState, useMemo, resetContext };
}
