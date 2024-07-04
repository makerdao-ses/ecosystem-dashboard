import { styled, useMediaQuery } from '@mui/material';
import { getResourceLabel } from '@ses/core/utils/string';
import { DateTime } from 'luxon';
import FundChangeCard from '../Cards/FundChangeCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import type { Theme } from '@mui/material';
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
}) => {
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));

  return (
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
          caption={isMobileOrTablet ? 'Initial L.T. Balance' : 'Initial Lifetime Balance'}
        />
        <FundChangeCard
          netChange={
            typeof balance?.inflow === 'number' && typeof balance?.outflow === 'number'
              ? balance.outflow * -1 - balance.inflow
              : undefined
          }
          leftValue={typeof balance?.outflow === 'number' ? balance?.outflow * -1 : undefined}
          leftText={isMobileOrTablet ? 'Extra Funds Available' : 'Extra Funds Made Available'}
          rightValue={balance?.inflow}
          rightValueColor="green"
          rightText={
            isMobileOrTablet
              ? 'Funds R. via DSSBlow'
              : isDesktop1024
              ? 'Funds Rtnd via DSSBlow'
              : 'Funds Returned via DSSBlow'
          }
        />
        <SimpleStatCard
          date={endDate}
          value={balance?.newBalance ? balance.newBalance * -1 : balance?.newBalance}
          caption={isMobileOrTablet ? 'New L.T. Balance' : 'New Lifetime Balance'}
          hasEqualSign
        />
      </CardsContainer>

      <TransactionHistory transactionHistory={transactionHistory} defaultExpanded={defaultExpanded} />
    </div>
  );
};

export default FundingOverview;

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
}));

const CardsContainer = styled('div')(({ theme }) => ({
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

  [theme.breakpoints.up('tablet_768')]: {
    flexWrap: 'nowrap',
    gap: 24,

    '& > div:nth-of-type(1)': {
      order: 1,
      minWidth: 158,
    },
    '& > div:nth-of-type(2)': {
      order: 2,
    },
    '& > div:nth-of-type(3)': {
      order: 3,
      minWidth: 158,
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));
