import { WebRequestTransformer } from '../types';

function transform(
  data: any,
  headers: any,
  fns?: WebRequestTransformer | WebRequestTransformer[]
): any {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    fns = [fns];
  }

  fns.forEach(fn => {
    data = fn(data, headers);
  });

  return data;
}

export default transform;
