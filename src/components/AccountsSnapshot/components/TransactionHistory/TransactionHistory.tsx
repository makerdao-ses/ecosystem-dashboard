import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useState } from 'react';
import AccordionArrow from '../AccordionArrow/AccordionArrow';
import TransactionList from '../TransactionList/TransactionList';
import type { AccordionProps } from '@mui/material/Accordion';
import type { SnapshotAccountTransaction } from '@ses/core/models/dto/snapshotAccountDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransactionHistoryProps {
  transactionHistory: SnapshotAccountTransaction[];
  // Only used for storybook
  defaultExpanded?: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactionHistory, defaultExpanded = false }) => {
  const { isLight } = useThemeContext();
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  return (
    <TransactionHistoryContainer>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary isLight={isLight} expandIcon={<AccordionArrow />}>
          View Transaction History
        </AccordionSummary>
        <AccordionDetails>
          <TransactionList items={transactionHistory} highlightPositiveAmounts={true} />
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

const AccordionSummary = styled(MuiAccordionSummary)<WithIsLight>(({ isLight }) => ({
  backgroundColor: isLight ? '#FFFFFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: 6,
  paddingLeft: 16,
  paddingRight: 8,
  minHeight: 'auto',
  zIndex: 1,

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
});
