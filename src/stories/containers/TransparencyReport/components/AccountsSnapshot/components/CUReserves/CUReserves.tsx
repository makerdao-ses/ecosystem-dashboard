import styled from '@emotion/styled';
import CheckboxMui from '@mui/material/Checkbox';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import ReserveCard from '../Cards/ReserveCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CUReservesProps {
  snapshotOwner: string;
  includeOffChain: boolean;
  toggleIncludeOffChain: () => void;
}

const CUReserves: React.FC<CUReservesProps> = ({ snapshotOwner, includeOffChain, toggleIncludeOffChain }) => {
  const { isLight } = useThemeContext();

  return (
    <div>
      <HeaderContainer>
        <SectionHeader
          title="Total Core Unit Reserves"
          subtitle={`On-chain and off-chain reserves accessible to the ${snapshotOwner}.`}
          tooltip={'pending...'}
        />
        <CheckContainer isLight={isLight}>
          Include Off-Chain Reserves{' '}
          <Checkbox checked={includeOffChain} onChange={toggleIncludeOffChain} isLight={isLight} size="small" />
        </CheckContainer>
      </HeaderContainer>

      <CardsContainer>
        <SimpleStatCard date="2023-05-12T22:52:54.494Z" value={1500000} caption="Initial Core Unit Reserves" />
        <FundChangeCard
          netChange={-242320}
          leftValue={305000}
          leftText="Inflow"
          rightValue={538320}
          rightText="Outflow"
        />
        <SimpleStatCard
          date="2023-06-14T22:52:54.494Z"
          value={1266680}
          caption="New Core Unit Reserves"
          hasEqualSign
          isReserves
        />
      </CardsContainer>

      <OnChainSubsection>
        <SectionHeader
          title="On Chain Reserves"
          subtitle={`Unspent on-chain reserves to the ${snapshotOwner}.`}
          tooltip={'pending...'}
          isSubsection
        />

        <ReservesCardsContainer>
          <ReserveCard
            name="DSS Vest"
            isGroup
            initialBalance={100000}
            inflow={300000}
            outflow={300000}
            newBalance={100000}
          />
          <ReserveCard
            name="Auditor"
            address={'0x23b554585a4ef8482'}
            initialBalance={500000}
            inflow={300000}
            outflow={250000}
            newBalance={550000}
          />
          <ReserveCard
            name="Operational"
            isGroup
            initialBalance={900000}
            inflow={250000}
            outflow={50000}
            newBalance={1100000}
          />
        </ReservesCardsContainer>
      </OnChainSubsection>

      <OffChainSubsection isDisabled={!includeOffChain}>
        <SectionHeader
          title="Off Chain Reserves"
          subtitle={`Unspent off-chain reserves to the ${snapshotOwner}.`}
          tooltip={'pending...'}
          isSubsection
        />

        <ReservesCardsContainer>
          <ReserveCard
            name="Payment Processor"
            isGroup
            initialBalance={100000}
            inflow={300000}
            outflow={300000}
            newBalance={0}
          />
          <ReserveCard
            // temporary disable as this is a WIP
            // eslint-disable-next-line spellcheck/spell-checker
            name="Coinbase Account"
            isGroup
            initialBalance={500000}
            inflow={300000}
            outflow={250000}
            newBalance={550680}
          />
        </ReservesCardsContainer>
      </OffChainSubsection>
    </div>
  );
};

export default CUReserves;

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

const HeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'flex-end',
  },
});

const CheckContainer = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#787A9B',
  display: 'flex',
  marginRight: 2,
  marginBottom: 1,
  gap: 10,
  marginTop: 20,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 4,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },

  '& span': {
    padding: 0,
  },
}));

const Checkbox = styled(CheckboxMui)<WithIsLight>(({ isLight }) => ({
  svg: {
    fill: isLight ? '#231536' : '#ADAFD4',
  },
}));

const OnChainSubsection = styled.div({
  marginTop: 24,
});

const OffChainSubsection = styled.div<{ isDisabled?: boolean }>(({ isDisabled = false }) => ({
  marginTop: 16,
  opacity: isDisabled ? 0.3 : 1,
}));

const ReservesCardsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
});
