import styled from '@emotion/styled';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';

interface CUReservesProps {
  coreUnitCode: string;
}

const CUReserves: React.FC<CUReservesProps> = ({ coreUnitCode }) => (
  <div>
    <SectionHeader
      title="Total Core Unit Reserves"
      subtitle={`On-chain and off-chain reserves accessible to the ${coreUnitCode} Core Unit.`}
      tooltip={'pending...'}
    />

    <CardsContainer>
      <SimpleStatCard date="2023-05-12T22:52:54.494Z" value={1500000} caption="Initial Core Unit Reserves" />
      <FundChangeCard
        netChange={-242320}
        leftValue={305000}
        leftText="Inflow"
        rightValue={538320}
        rightText="Outflow"
      />
      <SimpleStatCard date="2023-06-14T22:52:54.494Z" value={1266680} caption="New Core Unit Reserves" hasEqualSign />
    </CardsContainer>
  </div>
);

export default CUReserves;

const CardsContainer = styled.div({
  display: 'flex',
  gap: 24,
  marginTop: 24,
});
