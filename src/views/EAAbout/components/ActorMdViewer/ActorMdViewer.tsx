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
  actorName: string;
  auditors: AuditorDto[];
  subTitle?: string;
  budgetPath: string;
  auditorTitle: string;
}

const ActorMdViewer = ({
  sentenceDescription,
  paragraphDescription,

  showButton,
  queryStrings,
  code,
  shortCode,
  actorName,
  auditors,
  subTitle,
  budgetPath,
  auditorTitle,
}: Props) => (
  <ActorMdViewPage
    sentenceDescription={sentenceDescription}
    paragraphDescription={paragraphDescription}
    showButton={showButton}
    queryStrings={queryStrings}
    code={code}
    shortCode={shortCode}
    actorName={actorName}
    auditors={auditors}
    subTitle={subTitle}
    budgetPath={budgetPath}
    auditorTitle={auditorTitle}
  />
);
export default ActorMdViewer;
