let currentCallback = null;
const subscriberList = [];

const getHandler = (target, p, receiver) => {
  if (currentCallback) {
    let subscriber = subscriberList.find((sub) => sub.fn === currentCallback);
    if (!subscriber) {
      subscriber = { fn: currentCallback, deps: new Set() };
      subscriberList.push(subscriber);
    }
    subscriber.deps.add(p);
  }
  return Reflect.get(target, p, receiver);
};

const setHandler = (target, p, newValue, receiver) => {
  const oldValue = target[p];
  if (oldValue !== newValue) {
    Reflect.set(target, p, newValue, receiver);
    subscriberList.forEach((sub) => {
      if (sub.deps.has(p)) {
        sub.fn();
      }
    });
  }
  return true;
};

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};
export const 발행기관 = (obj) => {
  const proxy = new Proxy(obj, {
    get: getHandler,
    set: setHandler
  });

  return proxy;
};
