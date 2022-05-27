import { CuStatusEnum } from '../../enums/cu-status.enum';
import {
  MARKDOWN_PARAGRAPH_DESCRIPTION,
  MARKDOWN_PARAGRAPH_IMAGE,
  MARKDOWN_SENTENCE_DESCRIPTION,
} from '../../utils/test.utils';
import { CoreUnitsAboutBuilder } from '../builders/cu-about/cu-about.builder';
import { CuMipAboutBuilder } from '../builders/cu-about/cu-mip.builder';
import { getMarkdownInformation, getMipsStatus } from '../core-unit-about';
describe('first', () => {
  test('Get date for status on CuMip', () => {
    const result = new CuMipAboutBuilder()
      .withStatus(CuStatusEnum.Accepted)
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
});
