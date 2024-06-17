import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/config/endpoints';
import type { Team } from '@/core/models/interfaces/team';

export const fetchTeamsType = async () => {
  const query = gql`
    query Teams {
      teams {
        type
      }
    }
  `;

  const res = await request<{ teams: Team[] }>(GRAPHQL_ENDPOINT, query);
  return res?.teams;
};
