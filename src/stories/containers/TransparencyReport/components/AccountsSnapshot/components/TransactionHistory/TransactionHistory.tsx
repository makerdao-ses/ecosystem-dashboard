import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import AccordionArrow from '../AccordionArrow/AccordionArrow';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const TransactionHistory: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <TransactionHistoryContainer>
      <Accordion>
        <AccordionSummary isLight={isLight}>View Transaction History</AccordionSummary>
        <AccordionDetails>
          {/* NOTE: the transaction history is a WIP, the following element will be replaced entirely after finished the implementation */}
          <div
            style={{
              background: '#FBFBFB',
              boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
              padding: 64,
              borderRadius: '0px 0px 6px 6px',
              textAlign: 'center',
            }}
          >
            WIP
          </div>
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
  backgroundColor: isLight ? '#FFFFFF' : 'red',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px red, 0px 1px 3px red',
  borderRadius: 6,
  paddingLeft: 16,
  paddingRight: 8,
  minHeight: 'auto',

  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  '& .MuiAccordionSummary-content': {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    color: isLight ? '#231536' : 'red',
    marginTop: 8,
    marginBottom: 8,

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '19px',
      marginTop: 10.5,
      marginBottom: 10.5,
    },
  },

  '& .MuiAccordionSummary-expandIconWrapper': {
    // marginRight: 4,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: '0 56px',
});
