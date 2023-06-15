import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import GroupItem from '../GroupItem/GroupItem';
import Transaction from '../Transaction/Transaction';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const TransactionList: React.FC<{ showGroup?: boolean }> = ({ showGroup = false }) => {
  const { isLight } = useThemeContext();

  return (
    <TransactionListContainer isLight={isLight}>
      <TransactionCard isLight={isLight}>
        {showGroup && <GroupItem />}

        <Transaction
          name={'DSS Blow'}
          date={'2023-04-17T11:36:05.188Z'}
          toDate={null}
          txHash={'0xe079d59dbf813d2541a345ef4786cc44a8a'}
          counterPartyName={'Auditor Wallet'}
          counterPartyAddress={'0x232b5483e5a5cd22188482'}
          amount={-1153480}
        />
        <Transaction
          isIncomingTransaction={false}
          name={'DSS Vest'}
          date={'2023-04-15T11:36:05.188Z'}
          toDate={'2023-05-15T11:36:05.188Z'}
          txHash={'0xe079d59dbf813d2541a345ef4786cc44a8a'}
          counterPartyName={'Stream #14'}
          counterPartyAddress={'0x232b5483e5a5cd22188482'}
          amount={153480}
        />
        <Transaction
          name={'DSS Blow'}
          date={'2023-03-28T17:32:05.188Z'}
          toDate={null}
          txHash={'0xe079d59dbf813d2541a345ef4786cc44a8a'}
          counterPartyName={'Auditor Wallet'}
          counterPartyAddress={'0x232b5483e5a5cd22188482'}
          amount={-1153480}
        />
        <Transaction
          isIncomingTransaction={false}
          name={'Direct Transaction'}
          date={'2023-03-28T09:45:05.188Z'}
          toDate={null}
          txHash={'0xe079d59dbf813d2541a345ef4786cc44a8a'}
          counterPartyName={'Auditor Wallet'}
          counterPartyAddress={'0x232b5483e5a5cd22188482'}
          amount={153480}
        />
      </TransactionCard>
    </TransactionListContainer>
  );
};

export default TransactionList;

const TransactionListContainer = styled.div<WithIsLight>(({ isLight }) => ({
  padding: 0,
  position: 'relative',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0 24px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '0 32px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '0 40px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '0 56px',
  },

  '&:before': {
    content: '""',
    display: 'block',
    width: '100%',
    height: 17,
    position: 'absolute',
    top: -7,
    left: 0,
    opacity: 0.6,
    filter: 'blur(7.5px)',
    borderRadius: '0px 0px 6px 6px',
    background: isLight
      ? 'linear-gradient(0deg, rgba(219, 227, 237, 0.2), rgba(219, 227, 237, 0.2)), linear-gradient(180deg, rgba(190, 190, 190, 0.64) 0%, rgba(190, 190, 190, 0) 100%)'
      : 'linear-gradient(0deg, rgba(3, 16, 32, 0.2), rgba(3, 16, 32, 0.2)), linear-gradient(180deg, rgba(0, 32, 202, 0.64) 0%, rgba(64, 85, 200, 0) 100%)',
  },
}));

const TransactionCard = styled.div<WithIsLight>(({ isLight }) => ({
  borderRadius: '0 0 6px 6px',
  background: isLight ? '#ECEFF9' : '#38364D',
  overflow: 'hidden',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [lightTheme.breakpoints.up('table_834')]: {
    padding: 0,
    background: isLight ? '#FBFBFB' : '#162530',
    boxShadow: isLight ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : 'none',
    gap: 0,
  },
}));
