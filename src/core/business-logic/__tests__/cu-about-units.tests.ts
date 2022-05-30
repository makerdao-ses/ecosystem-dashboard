import { CuStatusEnum } from '../../enums/cu-status.enum';
import { LinkTypeEnum } from '../../enums/link-type.enum';
import {
  CONTRIBUTOR_COMMITMENT_ONE,
  CONTRIBUTOR_COMMITMENT_TWO,
  CURRENT_MONTH,
  MARKDOWN_PARAGRAPH_DESCRIPTION,
  MARKDOWN_PARAGRAPH_IMAGE,
  MARKDOWN_SENTENCE_DESCRIPTION,
} from '../../utils/test.utils';
import { CoreUnitsAboutBuilder } from '../builders/cu-about/cu-about.builder';
import { CuMipAboutBuilder } from '../builders/cu-about/cu-mip.builder';
import {
  getLinksFromContributor,
  getMarkdownInformation,
  getMipsStatus,
} from '../core-unit-about';
import { getRelateMipObjectFromCoreUnit } from '../core-units';
describe('first', () => {
  test('Get date for status on CuMip', () => {
    const result = new CuMipAboutBuilder()
      .withStatus(CuStatusEnum.Accepted, CURRENT_MONTH)
      .build();
    expect(getMipsStatus(result)).toBe(result.accepted);
  });
  test('Verify that markdown show', () => {
    const result = new CoreUnitsAboutBuilder()
      .withSentenceDescription(MARKDOWN_SENTENCE_DESCRIPTION)
      .withParagraphDescription(MARKDOWN_PARAGRAPH_DESCRIPTION)
      .withParagraphImage(MARKDOWN_PARAGRAPH_IMAGE)
      .build();
    expect(getMarkdownInformation(result.sentenceDescription)).toEqual(
      MARKDOWN_SENTENCE_DESCRIPTION
    );

    expect(getMarkdownInformation(result.paragraphDescription)).toEqual(
      MARKDOWN_PARAGRAPH_DESCRIPTION
    );
    expect(getMarkdownInformation(result.paragraphImage)).toEqual(
      MARKDOWN_PARAGRAPH_IMAGE
    );
  });

  test('Get the links from ContributorCommitment', () => {
    const result = new CoreUnitsAboutBuilder()
      .addContributorCommitment(CONTRIBUTOR_COMMITMENT_ONE)
      .addContributorCommitment(CONTRIBUTOR_COMMITMENT_TWO)
      .build();
    const linksCardOne = getLinksFromContributor(
      result.contributorCommitment[0]
    );
    const linksCardTwo = getLinksFromContributor(
      result.contributorCommitment[1]
    );
    expect(linksCardOne.length).toBe(4);
    expect(linksCardTwo.length).toBe(4);
    expect(linksCardOne[0].linkType).toBe(LinkTypeEnum.Gmail);
    expect(linksCardOne[1].linkType).toBe(LinkTypeEnum.Forum);
    expect(linksCardOne[2].linkType).toBe(LinkTypeEnum.Discord);
    expect(linksCardOne[3].linkType).toBe(LinkTypeEnum.Twitter);
  });
});
