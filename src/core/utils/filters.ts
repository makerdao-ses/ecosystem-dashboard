import type { CoreUnit } from '../models/interfaces/coreUnit';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { ParsedUrlQuery } from 'querystring';

const filterStatus = (lowerCaseStatuses: string[], data: CoreUnit) =>
  lowerCaseStatuses.length === 0 || lowerCaseStatuses.includes(data.status);

const filterCategories = (lowerCaseCategories: string[], data: CoreUnit) =>
  lowerCaseCategories.length === 0 || data.category?.some((x) => lowerCaseCategories.indexOf(x.toLowerCase()) > -1);

const filterByNameAndCode = (searchText: string, data: CoreUnit) =>
  searchText.trim().length === 0 ||
  data.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
  data.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const filterData = ({
  filteredStatuses = [],
  filteredCategories = [],
  searchText = '',
  data = [],
}: {
  filteredStatuses?: string[];
  filteredCategories?: string[];
  searchText?: string;
  data: CoreUnit[];
}) => {
  const lowerCaseStatuses = filteredStatuses.map((x) => x);
  const lowerCaseCategories = filteredCategories.map((x) => x.toLowerCase());
  return {
    filteredData:
      data?.filter((data) => {
        let filterResult = true;

        filterResult = filterResult && filterStatus(lowerCaseStatuses, data);

        filterResult = filterResult && filterCategories(lowerCaseCategories, data);

        filterResult = filterResult && filterByNameAndCode(searchText, data);

        return filterResult;
      }) ?? [],
    statusesFiltered:
      data?.filter((data) => {
        let filterResult = true;

        filterResult = filterResult && filterCategories(lowerCaseCategories, data);

        filterResult = filterResult && filterByNameAndCode(searchText, data);

        return filterResult;
      }) ?? [],
    categoriesFiltered:
      data?.filter((data) => {
        let filterResult = true;

        filterResult = filterResult && filterStatus(lowerCaseStatuses, data);

        filterResult = filterResult && filterByNameAndCode(searchText, data);

        return filterResult;
      }) ?? [],
  };
};

export const getArrayParam = (key: string, urlSearchParams: ParsedUrlQuery) => {
  if (!urlSearchParams || !key) return [];
  let filters: string[] = [];

  if (urlSearchParams[key]) {
    filters = (urlSearchParams[`${key}`] as string).split(',');
  }

  return filters;
};

export const getStringParam = (key: string, urlSearchParams: ParsedUrlQuery) => {
  if (!urlSearchParams) return '';
  return (urlSearchParams[`${key}`] as string) || '';
};

export const getLabelMultiselectFilters = (
  items: MultiSelectItem[],
  activeItems: string[],
  isMobile: boolean,
  label: string
) => {
  // Determine single active item label for mobile and non-mobile
  const singleActiveItemLabel =
    activeItems.length === 1 ? items.find((item) => item.id === activeItems[0])?.content : null;

  if (isMobile) {
    return activeItems.length === 1 ? `${label} (${activeItems.length})` : `${label}`;
  } else {
    return items.length === activeItems.length
      ? `All ${label}`
      : activeItems.length === 1 && singleActiveItemLabel
      ? singleActiveItemLabel
      : `${label}`;
  }
};
