import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react';
import AccordionArrow from '../AccordionArrow/AccordionArrow';
import TransactionList from '../TransactionList/TransactionList';
import type { AccordionProps } from '@mui/material/Accordion';
import type { SnapshotAccountTransaction } from '@ses/core/models/dto/snapshotAccountDTO';

interface TransactionHistoryProps {
  transactionHistory: SnapshotAccountTransaction[];
  // Only used for storybook
  defaultExpanded?: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactionHistory, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  return (
    <TransactionHistoryContainer>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<AccordionArrow />}>View Transaction History</AccordionSummary>
        <AccordionDetails>
          <TransactionList items={transactionHistory} highlightPositiveAmounts={true} />
        </AccordionDetails>
      </Accordion>
    </TransactionHistoryContainer>
  );
};

export default TransactionHistory;

const TransactionHistoryContainer = styled('div')(({ theme }) => ({
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',
});

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderRadius: 8,
  paddingLeft: 8,
  paddingRight: 8,
  minHeight: 'auto',
  zIndex: 1,

  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : '#292E38',

    '& .MuiAccordionSummary-content': {
      color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[100],
    },

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[100],
    },
  },

  '&.Mui-expanded': {
    [theme.breakpoints.down('tablet_768')]: {
      borderEndEndRadius: 0,
      borderEndStartRadius: 0,
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  '& .MuiAccordionSummary-content': {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 'normal',
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    marginTop: 8,
    marginBottom: 8,

    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: 16,
      lineHeight: 'normal',
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,
});
