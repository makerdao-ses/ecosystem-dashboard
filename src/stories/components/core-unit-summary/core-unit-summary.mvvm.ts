import useSWR from 'swr';
import { fetcher } from '../../../core/utils/fetcher';
import { gql } from 'graphql-request';

const CORE_UNITS_REQUEST = {
  query: gql`
  query CoreUnits {
   coreUnits {
        id
        code
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
      }
   }
`
};

export const useCoreUnitSummaryViewModel = () => {
  const { data, error } = useSWR(CORE_UNITS_REQUEST, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
