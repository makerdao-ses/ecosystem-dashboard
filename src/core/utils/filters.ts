import { getStatusMip39AcceptedOrObsolete } from '../businessLogic/coreUnits';
import type { CoreUnitDto } from '../models/dto/coreUnitDTO';
import type { ParsedUrlQuery } from 'querystring';

const filterStatus = (lowerCaseStatuses: string[], data: CoreUnitDto) =>
  lowerCaseStatuses.length === 0 ||
  lowerCaseStatuses.indexOf(getStatusMip39AcceptedOrObsolete(data)?.toLowerCase() ?? 'non-present') > -1;

const filterCategories = (lowerCaseCategories: string[], data: CoreUnitDto) =>
  lowerCaseCategories.length === 0 || data.category?.some((x) => lowerCaseCategories.indexOf(x.toLowerCase()) > -1);

const filterByNameAndCode = (searchText: string, data: CoreUnitDto) =>
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
  data: CoreUnitDto[];
}) => {
  const lowerCaseStatuses = filteredStatuses.map((x) => x.toLowerCase());
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
