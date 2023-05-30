import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import ReserveCard from '../Cards/ReserveCard/ReserveCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CUReservesProps {
  coreUnitCode: string;
}

const CUReserves: React.FC<CUReservesProps> = ({ coreUnitCode }) => {
  const { isLight } = useThemeContext();

  return (
    <div>
      <HeaderContainer>
        <SectionHeader
          title="Total Core Unit Reserves"
          subtitle={`On-chain and off-chain reserves accessible to the ${coreUnitCode} Core Unit.`}
          tooltip={'pending...'}
        />
        <CheckContainer isLight={isLight}>
          Include Off-Chain Reserves <Checkbox size="small" />
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
        <SimpleStatCard date="2023-06-14T22:52:54.494Z" value={1266680} caption="New Core Unit Reserves" hasEqualSign />
      </CardsContainer>

      <Subsection>
        <SectionHeader
          title="On Chain Reserves"
          subtitle={`Unspent on-chain reserves to the ${coreUnitCode} Core Unit.`}
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
      </Subsection>

      <Subsection isDisabled>
        <SectionHeader
          title="Off Chain Reserves"
          subtitle={`Unspent off-chain reserves accessible to the ${coreUnitCode} Core Unit.`}
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
      </Subsection>
    </div>
  );
};

export default CUReserves;

const CardsContainer = styled.div({
  display: 'flex',
  gap: 24,
  marginTop: 24,
});

const HeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

const CheckContainer = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#231536' : 'red',
  display: 'flex',
  marginRight: 2,
  marginBottom: 1,
  gap: 10,

  '& span': {
    padding: 0,
  },
}));

const Subsection = styled.div<{ isDisabled?: boolean }>(({ isDisabled = false }) => ({
  marginTop: 24,
  opacity: isDisabled ? 0.3 : 1,
}));

const ReservesCardsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
});
