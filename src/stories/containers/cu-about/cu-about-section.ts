import request, { gql } from 'graphql-request';
import { GraphQlEndpoint } from '../../../config/endpoint';

export const GET_CU_ABOUT_TEXT = gql`
  query CoreUnit($filter: CoreUnitFilter) {
    coreUnit(filter: $filter) {
      id
      code
      name
      image
      category
      sentenceDescription
      paragraphDescription
      paragraphImage
    }
  }
`;

export interface CoreUnitAboutText {
    id: string;
    code: string;
    name: string;
    image: string;
    category: string;
    sentenceDescription: string;
    paragraphDescription: string;
    paragraphImage: string;
  }

interface PropsCuAboutText {
    code: string;
  }
export const fetchCuAboutText = async({ code }: PropsCuAboutText) => {
  const data = await request(GraphQlEndpoint, GET_CU_ABOUT_TEXT, {
    filter: {
      code,
    },
  });
  return (data.coreUnit[0] as CoreUnitAboutText) || ({} as CoreUnitAboutText);
};
