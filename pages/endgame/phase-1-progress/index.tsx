import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import EndgamePhaseOneProgressContainer from '@ses/containers/EndgamePhaseOneProgress/EndgamePhaseOneProgressContainer';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';

const EndgamePhaseOneProgressPage: React.FC = () => <EndgamePhaseOneProgressContainer />;

export default EndgamePhaseOneProgressPage;

export const getServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ENDGAME_MILESTONES_PHASE_1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
