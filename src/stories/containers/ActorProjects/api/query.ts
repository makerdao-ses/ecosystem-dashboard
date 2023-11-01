import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { Project, ProjectsCollectionState } from '@ses/core/models/interfaces/projects';

export const getProjectsQuery = () => ({
  query: gql`
    query Projects($filter: ProjectFilter) {
      projects(filter: $filter) {
        id
        owner {
          ref
          id
          imgUrl
          name
          code
        }
        code
        title
        abstract
        status
        progress {
          value
        }
        imgUrl
        budgetType
        deliverables {
          id
          title
          status
          keyResults {
            id
            title
            link
          }
          owner {
            ref
            id
            imgUrl
            name
            code
          }
          progress {
            __typename
            ... on StoryPoints {
              total
              completed
            }
            ... on Percentage {
              value
            }
          }
        }
      }
    }
  `,
  filter: {
    filter: {},
  },
});

export const fetchProjects = async (): Promise<Project[]> => {
  const { query, filter } = getProjectsQuery();
  const res = await request<ProjectsCollectionState>(GRAPHQL_ENDPOINT, query, filter);
  return res?.projects;
};
