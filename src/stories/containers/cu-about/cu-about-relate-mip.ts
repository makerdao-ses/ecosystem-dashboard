import request, { gql } from 'graphql-request';
import { GraphQlEndpoint } from '../../../config/endpoint';
import { CuMipStatus } from './cu-about.api';

export interface RelateMipsCuAbout {
    mipTitle: string;
    mipUrl: string;
    mipStatus: CuMipStatus;
    accepted?: string;
    obsolete?: string;
    rfc?: string;
    formalSubmission?: string;
    rejected?: string;
  }
export const GET_RELATE_MIPS = gql`
  query CuMip($filter: CuMipFilter) {
    cuMip(filter: $filter) {
      mipTitle
      mipUrl
      mipStatus
      accepted
      obsolete
      rfc
      formalSubmission
      rejected
    }
  }
`;

interface PropsRelateMips {
    cuId: string;
  }
export const fetchRelateMips = async({ cuId }: PropsRelateMips) => {
  const data = await request(GraphQlEndpoint, GET_RELATE_MIPS, {
    filter: {
      cuId,
    },
  });
  return (data.cuMip as RelateMipsCuAbout[]) || [];
};
