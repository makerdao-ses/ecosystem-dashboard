import styled from '@emotion/styled';
import React from 'react';
import OutlinedCard from '../Cards/OutlinedCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';

interface FundingOverviewProps {
  coreUnitCode: string;
}

const FundingOverview: React.FC<FundingOverviewProps> = ({ coreUnitCode }) => (
  <div>
    <SectionHeader
      title="MakerDAO Funding Overview"
      subtitle={`Totals funds made available to the ${coreUnitCode} Core Unit over its entire lifetime, since June 2021.`}
      tooltip={'pending...'}
    />

    <CardsContainer>
      <SimpleStatCard date="2023-05-12T22:52:54.494Z" value={3685648} caption="Initial Lifetime Balance" />
      <TemporaryContainer>
        <OutlinedCard />
      </TemporaryContainer>
      <SimpleStatCard date="2023-06-14T22:52:54.494Z" value={3685648} caption="New Lifetime Balance" hasEqualSign />
    </CardsContainer>
  </div>
);

export default FundingOverview;

const CardsContainer = styled.div({
  display: 'flex',
  gap: 24,
  marginTop: 24,
});

const TemporaryContainer = styled.div({
  width: 579,
  minWidth: 579,

  '& > div': {
    height: '100%',
  },
});
