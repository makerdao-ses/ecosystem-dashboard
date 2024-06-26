import React from 'react';
import type { AuditorDto } from '@/core/models/dto/coreUnitDTO';
import type { ResourceType } from '@/core/models/interfaces/types';
import MdViewerPage from './MdViewerPage';

interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  showButton?: boolean;
  queryStrings: string;
  code: string;
  shortCode: string;
  auditors: AuditorDto[];
  budgetPath: string;
  type: ResourceType;
}

const MdViewerContainer = ({
  sentenceDescription,
  paragraphDescription,
  paragraphImage,
  showButton,
  queryStrings,
  code,
  shortCode,
  auditors,
  budgetPath,
  type,
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
      shortCode={shortCode}
      auditors={auditors}
      budgetPath={budgetPath}
      type={type}
    />
  );
};

export default MdViewerContainer;
