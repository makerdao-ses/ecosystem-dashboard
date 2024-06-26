import { styled } from '@mui/material';
import CheckboxMui from '@mui/material/Checkbox';
import FundChangeCard from '../Cards/FundChangeCard';
import ReserveCard from '../Cards/ReserveCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import type { SnapshotAccountBalance, UIReservesData } from '@ses/core/models/dto/snapshotAccountDTO';

interface CUReservesProps {
  snapshotOwner?: string;
  includeOffChain: boolean;
  toggleIncludeOffChain: () => void;
  startDate?: string;
  endDate?: string;
  balance?: SnapshotAccountBalance;
  onChainData?: UIReservesData[];
  offChainData?: UIReservesData[];
  isCoreUnit: boolean;
}

const CUReserves: React.FC<CUReservesProps> = ({
  snapshotOwner,
  includeOffChain,
  toggleIncludeOffChain,
  startDate,
  endDate,
  balance,
  onChainData,
  offChainData,
  isCoreUnit,
}) => (
  <div>
    <HeaderContainer>
      <SectionHeader
        title={`Total ${isCoreUnit ? 'Core Unit' : ''} Reserves`}
        subtitle={`On-Chain and off-chain reserves accessible${snapshotOwner ? ` to the ${snapshotOwner}` : ''}.`}
        tooltip={
          'Explore on and off-chain balances in DAI and other currencies, identify the flow of funds and track the \
             total inflow from the Maker Protocol to internal operational wallets, as well as the outflow to external \
             wallets (e.g., Payment Processor) wallets.'
        }
      />
      {!!offChainData?.length && (
        <CheckContainer>
          Include Off-Chain Reserves{' '}
          <Checkbox checked={includeOffChain} onChange={toggleIncludeOffChain} size="small" />
        </CheckContainer>
      )}
    </HeaderContainer>

    <CardsContainer>
      <SimpleStatCard
        date={startDate}
        value={balance?.initialBalance}
        caption={`Initial ${isCoreUnit ? 'Core Unit' : ''} Reserves`}
        dynamicChanges
      />
      <FundChangeCard
        netChange={
          typeof balance?.inflow === 'number' && typeof balance?.outflow === 'number'
            ? balance.outflow - balance.inflow * -1
            : undefined
        }
        leftValue={balance?.inflow}
        leftText="Inflow"
        rightValue={typeof balance?.outflow === 'number' ? balance?.outflow * -1 : undefined}
        rightText="Outflow"
        dynamicChanges
      />
      <SimpleStatCard
        date={endDate}
        value={balance?.newBalance}
        caption={`New ${isCoreUnit ? 'Core Unit' : ''} Reserves`}
        hasEqualSign
        isReserves
        dynamicChanges
      />
    </CardsContainer>

    <OnChainSubsection>
      <SectionHeader
        title="On Chain Reserves"
        subtitle={`Unspent On-Chain reserves${snapshotOwner ? ` to the ${snapshotOwner}` : ''}.`}
        tooltip={
          <>
            Track and analyze the movement of <br /> On-Chain assets.
          </>
        }
        isSubsection
      />

      <ReservesCardsContainer>
        {onChainData?.map((account) => (
          <ReserveCard key={account.id} account={account} />
        ))}
      </ReservesCardsContainer>
    </OnChainSubsection>

    {!!offChainData?.length && (
      <OffChainSubsection isDisabled={!includeOffChain}>
        <SectionHeader
          title="Off Chain Reserves"
          subtitle={`Unspent off-chain reserves${snapshotOwner ? ` to the ${snapshotOwner}` : ''}.`}
          tooltip={
            <>
              Discover essential details about the <br />
              off-chain balances.
            </>
          }
          isSubsection
        />

        <ReservesCardsContainer>
          {offChainData?.map((account) => (
            <ReserveCard key={account.id} account={account} />
          ))}
        </ReservesCardsContainer>
      </OffChainSubsection>
    )}
  </div>
);

export default CUReserves;

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

  [theme.breakpoints.up('table_834')]: {
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

  [theme.breakpoints.up('desktop_1194')]: {
    gap: 24,
  },
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flexDirection: 'column',

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    alignItems: 'flex-end',
  },
}));

const CheckContainer = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#787A9B',
  display: 'flex',
  marginRight: 2,
  marginBottom: 1,
  gap: 10,
  marginTop: 20,

  [theme.breakpoints.up('table_834')]: {
    marginTop: 4,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },

  '& span': {
    padding: 0,
  },
}));

const Checkbox = styled(CheckboxMui)(({ theme }) => ({
  svg: {
    fill: theme.palette.isLight ? '#231536' : '#ADAFD4',
  },
}));

const OnChainSubsection = styled('div')(({ theme }) => ({
  marginTop: 24,

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 23,
  },
}));

const OffChainSubsection = styled('div')<{ isDisabled?: boolean }>(({ isDisabled = false }) => ({
  marginTop: 24,
  opacity: isDisabled ? 0.3 : 1,
}));

const ReservesCardsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
});
