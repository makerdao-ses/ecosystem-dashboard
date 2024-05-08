import styled from '@emotion/styled';
import { getResourceLabel } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import type { SnapshotAccountBalance, SnapshotAccountTransaction } from '@ses/core/models/dto/snapshotAccountDTO';
import type { ResourceType } from '@ses/core/models/interfaces/types';

interface FundingOverviewProps {
  enableCurrencyPicker?: boolean;
  snapshotOwner?: string;
  startDate?: string;
  endDate?: string;
  balance?: SnapshotAccountBalance;
  transactionHistory: SnapshotAccountTransaction[];
  sinceDate?: Date;
  resourceType?: ResourceType;

  // Only used for storybook
  defaultExpanded?: boolean;
}

const FundingOverview: React.FC<FundingOverviewProps> = ({
  enableCurrencyPicker = false,
  snapshotOwner,
  startDate,
  endDate,
  sinceDate,
  balance,
  transactionHistory,
  resourceType,
  defaultExpanded = false,
}) => (
  <div>
    <HeaderContainer>
      <SectionHeader
        title="MakerDAO Funding Overview"
        subtitle={
          <>
            Totals funds made available {snapshotOwner ? `to the ${snapshotOwner}` : ''} over its entire lifetime
            {sinceDate ? (
              <>
                , since <b>{DateTime.fromJSDate(sinceDate).toFormat('LLLL yyyy')}</b>
              </>
            ) : (
              ''
            )}
            .
          </>
        }
        tooltip={`Monitor funds made available to ${getResourceLabel(resourceType)}s, track spending, returns, \
        and reserves, differentiate internal/external transactions, and gain insights into changes in MakerDAO's\
        Lifetime Balances.`}
      />
      {enableCurrencyPicker && <CurrencyPicker />}
    </HeaderContainer>

    <CardsContainer>
      <SimpleStatCard
        date={startDate}
        value={typeof balance?.initialBalance === 'number' ? Math.abs(balance?.initialBalance ?? 0) : undefined}
        caption="Initial Lifetime Balance"
      />
      <FundChangeCard
        netChange={
          typeof balance?.inflow === 'number' && typeof balance?.outflow === 'number'
            ? balance.outflow * -1 - balance.inflow
            : undefined
        }
        leftValue={typeof balance?.outflow === 'number' ? balance?.outflow * -1 : undefined}
        leftText="Extra Funds Made Available"
        rightValue={balance?.inflow}
        rightValueColor="green"
        rightText="Funds Returned"
      />
      <SimpleStatCard
        date={endDate}
        value={balance?.newBalance ? balance.newBalance * -1 : balance?.newBalance}
        caption="New Lifetime Balance"
        hasEqualSign
      />
    </CardsContainer>

    <TransactionHistory transactionHistory={transactionHistory} defaultExpanded={defaultExpanded} />
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
