import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useState } from 'react';
import AccordionArrow from '../AccordionArrow/AccordionArrow';
import Transaction from '../Transaction/Transaction';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransactionHistoryProps {
  // Only used for storybook
  defaultExpanded?: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ defaultExpanded = false }) => {
  const { isLight } = useThemeContext();
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  return (
    <TransactionHistoryContainer>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary isLight={isLight}>View Transaction History</AccordionSummary>
        <AccordionDetails>
          <TransactionContainer isLight={isLight}>
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
          </TransactionContainer>
        </AccordionDetails>
      </Accordion>
    </TransactionHistoryContainer>
  );
};

export default TransactionHistory;

const TransactionHistoryContainer = styled.div({
  marginTop: 24,
});

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',
});

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<AccordionArrow />} {...props} />
))<WithIsLight>(({ isLight }) => ({
  backgroundColor: isLight ? '#FFFFFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: 6,
  paddingLeft: 16,
  paddingRight: 8,
  minHeight: 'auto',

  '&.Mui-expanded': {
    [lightTheme.breakpoints.down('table_834')]: {
      borderEndEndRadius: 0,
      borderEndStartRadius: 0,
    },
  },

  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 24,
    paddingRight: 16,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingRight: 25,
  },

  '& .MuiAccordionSummary-content': {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    color: isLight ? '#231536' : '#D2D4EF',
    marginTop: 8,
    marginBottom: 8,

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '19px',
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      marginTop: 10,
      marginBottom: 10,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,

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
});

const TransactionContainer = styled.div<WithIsLight>(({ isLight }) => ({
  borderRadius: '0 0 6px 6px',
  background: isLight ? '#ECEFF9' : '#38364D',
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
