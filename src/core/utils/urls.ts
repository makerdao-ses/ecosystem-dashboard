import isEmpty from 'lodash/isEmpty';
import { BASE_URL } from '../../config/routes';

export interface QueryStringOptions {
  includeQuestionMark?: boolean;
  excludeEmptyValues?: boolean;
  includeAlways?: Array<string>;
}

export const buildQueryString = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { [key: string]: any },
  { includeQuestionMark = true, excludeEmptyValues = true, includeAlways = [] }: QueryStringOptions = {}
): string => {
  let query = '';

  for (const key in params) {
    if (isEmpty(params[key]) && excludeEmptyValues && !includeAlways.includes(key)) {
      continue;
    }

    query += `${query.length > 0 ? '&' : ''}${key}=${encodeURI(params[key]?.toString() || '')}`;
  }
  return includeQuestionMark && query.length > 0 ? `?${query}` : query;
};

export const toAbsoluteURL = (relativeURL: string): string => {
  if (relativeURL.startsWith('http://') || relativeURL.startsWith('https://')) {
    return relativeURL;
  }

  if (!relativeURL.startsWith('/')) {
    relativeURL = `/${relativeURL}`;
  }
  return `${BASE_URL}${relativeURL}`;
};

export const removeEmptyProperties = <T extends object>(obj: T): Partial<T> => {
  const newObj: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      newObj[key as keyof T] = value;
    }
  }
  return newObj;
};
