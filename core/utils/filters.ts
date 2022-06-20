import { CoreUnitDao } from '../../stories/containers/cu-table/cu-table.api';

export const filterData = ({
  filteredStatuses = [],
  filteredCategories = [],
  searchText = '',
  data = [],
}: {
  filteredStatuses?: string[];
  filteredCategories?: string[];
  searchText?: string;
  data: CoreUnitDao[];
}) => {
  const lowerCaseStatuses = filteredStatuses.map((x) => x.toLowerCase());
  const lowerCaseCategories = filteredCategories.map((x) => x.toLowerCase());
  return data.filter((data) => {
    let filterResult = true;

    // Filter by status
    filterResult =
      filterResult &&
      (lowerCaseStatuses.length === 0 ||
        lowerCaseStatuses.indexOf(
          data.cuMip[data.cuMip.length - 1]?.mipStatus?.toLowerCase() ??
            'non-present'
        ) > -1);

    // Filter by categories
    filterResult =
      filterResult &&
      (lowerCaseCategories.length === 0 ||
        data.category?.some(
          (x) => lowerCaseCategories.indexOf(x.toLowerCase()) > -1
        ));

    // Filter by name
    filterResult =
      filterResult &&
      (searchText.trim().length === 0 ||
        data.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        data.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

    return filterResult;
  });
};

export const getArrayParam = (key: string, filters: URLSearchParams) => {
  return (filters.get(key) || '').split(',').filter((v) => v !== '');
};

export const getStringParam = (key: string, filters: URLSearchParams) => {
  return (filters.get(key) || '');
};
