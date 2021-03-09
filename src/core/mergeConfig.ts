import { WebRequestConfig } from '../types';
import { isPlainObject, deepMerge } from '../utils/tools';

function defaultStrat(v1: any, v2: any): any {
  return v2 === undefined ? v1 : v2;
}

function fromV2Strat(v1: any, v2: any): any {
  if (v2 !== undefined) {
    return v2;
  }
}

function deepMergeStrat(v1: any, v2: any): any {
  if (isPlainObject(v2)) {
    return deepMerge(v1, v2);
  } else if (v2 !== undefined) {
    return v2;
  } else if (isPlainObject(v1)) {
    return deepMerge(v1);
  } else if (v1 !== undefined) {
    return v1;
  }
}

const strats = Object.create(null);

const stratKeysFromV2 = ['url', 'params', 'data'];

const stratKeysDeepMerge = ['headers'];

stratKeysFromV2.forEach(k => {
  strats[k] = fromV2Strat;
});

stratKeysDeepMerge.forEach(k => {
  strats[k] = deepMergeStrat;
});

function mergeField(
  key: string,
  config: any,
  config1: WebRequestConfig,
  config2: WebRequestConfig
): void {
  const strat = strats[key] || defaultStrat;
  config[key] = strat(config1[key], config2[key]);
}

function mergeConfig(config1: WebRequestConfig, config2?: WebRequestConfig): WebRequestConfig {
  if (!config2) {
    config2 = {};
  }
  const config = Object.create(null);
  for (let k in config2) {
    mergeField(k, config, config1, config2);
  }

  for (let k in config1) {
    if (!config2[k]) {
      mergeField(k, config, config1, config2);
    }
  }

  return config;
}

export default mergeConfig;
