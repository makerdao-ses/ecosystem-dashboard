import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import { CuActivityDto } from '../../../core/models/dto/core-unit-activity.dto';

export const GET_CU_ACTIVITY = gql`
  query ($filter: CuUpdateFilter) {
    cuUpdate(filter: $filter) {
      id
      cuId
      updateDate
      updateTitle
      updateUrl
    }
  }
`;

export const fetchCoreUnitActivity = async (cuId: string) => {
  const res = (await request(GRAPHQL_ENDPOINT, GET_CU_ACTIVITY, {
    filter: {
      cuId,
    },
  })) as { cuUpdate: CuActivityDto[] };

  return res.cuUpdate;
};
