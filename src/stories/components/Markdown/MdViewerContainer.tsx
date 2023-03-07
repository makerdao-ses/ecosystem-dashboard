import React from 'react';
import MdViewerPage from './MdViewerPage';
import type { AuditorDto } from '../../../core/models/dto/core-unit.dto';
interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  showButton?: boolean;
  queryStrings: string;
  code: string;
  auditors: AuditorDto[];
}

const MdViewerContainer = ({
  sentenceDescription,
  paragraphDescription,
  paragraphImage,
  showButton,
  queryStrings,
  code,
  auditors,
}: Props) => {
  const convertImg = paragraphImage ? `![Image](${paragraphImage})` : null;
  return (
    <MdViewerPage
      paragraphImage={convertImg}
      sentenceDescription={sentenceDescription}
      paragraphDescription={paragraphDescription}
      showButton={showButton}
      queryStrings={queryStrings}
      code={code}
      auditors={auditors}
    />
  );
};

export default MdViewerContainer;
