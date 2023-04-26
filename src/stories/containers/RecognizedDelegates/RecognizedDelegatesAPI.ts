import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';

export const GET_RECOGNIZED_DELEGATES = gql`
  query RecognizedDelegates {
    recognizedDelegates {
      name
      image
      latestVotingContract
      socials {
        forumProfile
        forumPlatform
        youtube
        twitter
        votingPortal
      }
    }
  }
`;

interface RecognizedDelegatesResponse {
  recognizedDelegates: RecognizedDelegatesDto[];
}

export const fetchRecognizedDelegates = async (): Promise<RecognizedDelegatesDto[]> => {
  const response = (await request(GRAPHQL_ENDPOINT, GET_RECOGNIZED_DELEGATES)) as RecognizedDelegatesResponse;

  return response.recognizedDelegates;
};
