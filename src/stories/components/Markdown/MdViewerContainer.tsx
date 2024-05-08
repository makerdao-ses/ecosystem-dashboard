import React from 'react';
import MdViewerPage from './MdViewerPage';
import type { AuditorDto } from '../../../core/models/dto/coreUnitDTO';
interface Props {
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  showButton?: boolean;
  queryStrings: string;
  code: string;
  shortCode: string;
  auditors: AuditorDto[];
  calculatedBudgetPath: string;
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
  calculatedBudgetPath,
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
      calculatedBudgetPath={calculatedBudgetPath}
    />
  );
};

export default MdViewerContainer;
