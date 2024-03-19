export function createHooks(callback) {
  const stateMap = new Map();
  const generateId = () => {
    const id = `state_${index}`;
    index++;
    return id;
  };
  let index = 0;

  const memoMap = new Map();
  let memoIndex = 0;
  // TODO: index 관리하는애 만들기
  const generateMemoId = () => {
    const id = `memo_${memoIndex}`;
    memoIndex++;
    return id;
  };

  const useState = (initState) => {
    const id = generateId();

    if (!stateMap.has(id)) {
      stateMap.set(id, initState);
    }

    const setState = (newState) => {
      const currentState = stateMap.get(id);

      if (currentState !== newState) {
        stateMap.set(id, newState);
        callback();
      }
    };

    return [stateMap.get(id), setState];
  };

  const useMemo = (fn, refs) => {
    const id = generateMemoId();

    if (memoMap.has(id)) {
      const [value, prevRefs] = memoMap.get(id);

      // TODO: ref 비교 개선
      if (JSON.stringify(prevRefs) !== JSON.stringify(refs)) {
        const value = fn();
        memoMap.set(id, [value, refs]);
        return value;
      }
      return value;
    }

    const value = fn();
    memoMap.set(id, [value, refs]);
    return memoMap.get(id)[0];
  };

  const resetContext = () => {
    index = 0;
    memoIndex = 0;
  };

  return { useState, useMemo, resetContext };
}
