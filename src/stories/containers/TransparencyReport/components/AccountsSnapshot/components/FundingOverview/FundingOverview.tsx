import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import type { SnapshotAccountBalance } from '@ses/core/models/dto/snapshotAccountDTO';

interface FundingOverviewProps {
  snapshotOwner: string;
  startDate?: string;
  endDate?: string;
  balance: SnapshotAccountBalance;
}

const FundingOverview: React.FC<FundingOverviewProps> = ({ snapshotOwner, startDate, endDate, balance }) => (
  <div>
    <HeaderContainer>
      <SectionHeader
        title="MakerDAO Funding Overview"
        subtitle={`Totals funds made available to the ${snapshotOwner} over its entire lifetime${
          startDate ? `, since ${DateTime.fromISO(startDate).toFormat('LLLL yyyy')}` : ''
        }.`}
        tooltip={'pending...'}
      />
      <CurrencyPicker />
    </HeaderContainer>

    <CardsContainer>
      <SimpleStatCard date={startDate} value={balance.initialBalance} caption="Initial Lifetime Balance" />
      <FundChangeCard
        netChange={balance.inflow - balance.outflow}
        leftValue={balance.inflow}
        leftText="Extra Funds Made Available"
        rightValue={balance.outflow}
        rightValueColor="green"
        rightText="Funds Returned via DSSBlow"
      />
      <SimpleStatCard date={endDate} value={balance.newBalance} caption="New Lifetime Balance" hasEqualSign />
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
