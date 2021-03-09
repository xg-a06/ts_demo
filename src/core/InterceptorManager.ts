import { ResloveFn, RejectFn } from '../types';

interface Interceptor<T> {
  resolved: ResloveFn<T>;
  rejected?: RejectFn;
}

class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>;
  constructor() {
    this.interceptors = [];
  }

  use(resolved: ResloveFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({ resolved, rejected });

    return this.interceptors.length - 1;
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    });
  }
}

export default InterceptorManager;
