import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

interface FundingOverviewProps {
  snapshotOwner: string;
}

const FundingOverview: React.FC<FundingOverviewProps> = ({ snapshotOwner }) => (
  <div>
    <HeaderContainer>
      <SectionHeader
        title="MakerDAO Funding Overview"
        subtitle={`Totals funds made available to the ${snapshotOwner} over its entire lifetime, since June 2021.`}
        tooltip={'pending...'}
      />
      <CurrencyPicker />
    </HeaderContainer>

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
      <SimpleStatCard date="2023-06-14T22:52:54.494Z" value={3743328} caption="New Lifetime Balance" hasEqualSign />
    </CardsContainer>

    <TransactionHistory />
  </div>
);

export default FundingOverview;

const HeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
});

const CardsContainer = styled.div({
  display: 'flex',
  gap: 8,
  marginTop: 24,
  flexWrap: 'wrap',

  '& > div:nth-of-type(1)': {
    order: 1,
    width: 'calc(50% - 4px)',
  },
  '& > div:nth-of-type(2)': {
    order: 3,
  },
  '& > div:nth-of-type(3)': {
    order: 2,
    width: 'calc(50% - 4px)',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    flexWrap: 'nowrap',

    '& > div:nth-of-type(1)': {
      order: 1,
      width: '100%',
    },
    '& > div:nth-of-type(2)': {
      order: 2,
    },
    '& > div:nth-of-type(3)': {
      order: 3,
      width: '100%',
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 24,
  },
});
