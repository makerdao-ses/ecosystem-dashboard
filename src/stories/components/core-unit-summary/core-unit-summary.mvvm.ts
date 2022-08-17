import useSWRImmutable from 'swr/immutable';
import { fetcher } from '../../../core/utils/fetcher';
import { gql } from 'graphql-request';

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
      }
   }
`
};

export const useCoreUnitSummaryViewModel = () => {
  const { data, error } = useSWRImmutable(CORE_UNITS_REQUEST, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
