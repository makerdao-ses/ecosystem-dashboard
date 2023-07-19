import React from 'react';

import ActorMdViewPage from './ActorMdViewPage';
import type { AuditorDto } from '@ses/core/models/dto/coreUnitDTO';

interface Props {
  sentenceDescription: string;
  paragraphDescription?: string;

  showButton?: boolean;
  queryStrings: string;
  code: string;
  shortCode: string;
  auditors: AuditorDto[];
  subTitle?: string;
}

const ActorMdViewer = ({
  sentenceDescription,
  paragraphDescription,

  showButton,
  queryStrings,
  code,
  shortCode,
  auditors,
  subTitle,
}: Props) => (
  <ActorMdViewPage
    sentenceDescription={sentenceDescription}
    paragraphDescription={paragraphDescription}
    showButton={showButton}
    queryStrings={queryStrings}
    code={code}
    shortCode={shortCode}
    auditors={auditors}
    subTitle={subTitle}
  />
);
export default ActorMdViewer;
