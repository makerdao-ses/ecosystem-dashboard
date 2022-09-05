import useSWRImmutable from 'swr/immutable';
import { fetcher } from '../../../core/utils/fetcher';
import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CuMipDto, SocialMediaChannelDto } from '../../../core/models/dto/core-unit.dto';

export interface SummarizedCoreUnit {
  id: string;
  shortCode: string;
  code: string;
  name: string;
  image: string;
  sentenceDescription: string;
  category: string[];
  cuMip: CuMipDto[];
  socialMediaChannels: SocialMediaChannelDto[];
}

const CORE_UNITS_REQUEST = {
  query: gql`
  query CoreUnits {
   coreUnits {
        id
        code
        shortCode
        name
        image
        category
        sentenceDescription
        cuMip {
          mipCode
          mipStatus
          mipUrl
          formalSubmission
          accepted
          rfc
          rejected
          obsolete
        }
        socialMediaChannels {
          forumTag
          twitter
          youtube
          discord
          linkedIn
          website
        }
        budgetStatements {
          month
          budgetStatementWallet {
            budgetStatementLineItem {
              actual
              month
            }
          }
        }
      }
   }
`
};

export const fetchCoreUnits = async() => {
  const res = (await request(GRAPHQL_ENDPOINT, CORE_UNITS_REQUEST.query)) as { coreUnits: SummarizedCoreUnit[]};
  return res?.coreUnits;
};

export const useCoreUnitSummaryViewModel = () => {
  const { data, error } = useSWRImmutable(CORE_UNITS_REQUEST, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
