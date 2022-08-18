import isEmpty from 'lodash/isEmpty';

export interface QueryStringOptions {
  includeQuestionMark?: boolean;
  excludeEmptyValues?: boolean;
  includeAlways?: Array<string>;
}

export const buildQueryString = (
  params: { [key: string]: unknown },
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
