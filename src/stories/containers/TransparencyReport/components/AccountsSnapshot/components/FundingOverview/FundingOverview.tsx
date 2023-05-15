import styled from '@emotion/styled';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

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
      <FundChangeCard
        netChange={57680}
        leftValue={300000}
        leftText="Extra Funds Made Available"
        rightValue={242320}
        rightValueColor="green"
        rightText="Funds Returned via DSSBlow"
      />
      <SimpleStatCard date="2023-06-14T22:52:54.494Z" value={3685648} caption="New Lifetime Balance" hasEqualSign />
    </CardsContainer>

    <TransactionHistory />
  </div>
);

export default FundingOverview;

const CardsContainer = styled.div({
  display: 'flex',
  gap: 24,
  marginTop: 24,
});
