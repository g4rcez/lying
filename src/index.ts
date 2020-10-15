type Resolve<T> = T extends Promise<infer P> ? P : T extends (...args: any[]) => Promise<infer V> ? V : T;

type Promises<T> = { [k in keyof T]: T[k] };

type PromisesSettled<T> = {
  [k in keyof T]: {
    success: false; value: Resolve<Error>
  } | {
    success: true; value: Resolve<T[k]>
  };
};

type PromiseInput<T> = {
  [k in keyof T]: Promise<T[k]> | T[k];
};

export const PromiseAll = async <T,>(promiseObject: PromiseInput<T>): Promise<Promises<T>> => {
  const promises = Object.values(promiseObject);
  const resolved = await Promise.all(promises);
  return Object.keys(promiseObject).reduce(
    (acc, el, i): Promises<T> => ({
      ...acc,
      [el]: resolved[i]
    }),
    {} as Promises<T>
  );
};

export const PromiseSettled = async <T,>(promiseObject: PromiseInput<T>): Promise<PromisesSettled<T>> => {
  const promises = Object.values(promiseObject);
  const resolved = await Promise.allSettled(promises);
  return Object.keys(promiseObject).reduce((acc, el, i): PromisesSettled<T> => {
    const promise = resolved[i];
    const success = promise.status === "fulfilled";
    if (success) {
      return {
        ...acc,
        [el]: { success, value: (promise as any).value }
      };
    }
    return {
      ...acc,
      [el]: { success: false, value: (promise as any).reason }
    };
  }, {} as PromisesSettled<T>);
};

export default { all: PromiseAll, settled: PromiseSettled };