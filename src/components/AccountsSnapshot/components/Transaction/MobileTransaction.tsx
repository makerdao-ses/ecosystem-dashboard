import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import GreenArrowDown from '../SVG/GreenArrowDown';
import RedArrowUp from '../SVG/RedArrowUp';
import TxHash from '../TxHash/TxHash';
import TransactionWalletInfo from './TransactionWalletInfo';
import type { TransactionProps } from './Transaction';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';

interface MobileTransactionProps extends TransactionProps {
  // prop to allow the component to be expanded by default (used in the storybook)
  defaultExpanded?: boolean;
}

const MobileTransaction: React.FC<MobileTransactionProps> = ({
  name,
  date,
  toDate,
  txHash,
  counterPartyName,
  counterPartyAddress,
  amount,
  defaultExpanded = false,
  highlightPositiveAmounts,
}) => {
  const { isLight } = useThemeContext();
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const isIncomingTransaction = amount > 0;
  const formattedDate = toDate ? (
    <>
      from {DateTime.fromISO(date).toUTC().toFormat('dd-MMM-yyyy')}
      <br />
      to {DateTime.fromISO(toDate).toUTC().toFormat('dd-MMM-yyyy')}
    </>
  ) : (
    DateTime.fromISO(date).toUTC().toFormat("dd-MMM-yyyy HH:mm 'UTC'")
  );

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <TransactionSummary expanded={expanded}>
        <ArrowContainer>{isIncomingTransaction ? <GreenArrowDown /> : <RedArrowUp />}</ArrowContainer>
        <Content>
          <Data>
            <Name>{name}</Name>
            <Date>{formattedDate}</Date>
          </Data>
          <Value isGreen={amount > 0 && !!highlightPositiveAmounts}>
            <Sign>{amount < 0 ? '-' : '+'}</Sign>
            {usLocalizedNumber(Math.abs(amount))}
            <Currency>DAI</Currency>
          </Value>
        </Content>
        <CollapseIndicator>
          {expanded ? (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.46205 4.43037C3.46205 4.43037 3.65393 4.43037 3.89062 4.43037C4.12733 4.43037 4.3192 4.43037 4.3192 4.43037V4.42894H6.46205C6.69875 4.42894 6.89062 4.23707 6.89062 4.00037C6.89062 3.76367 6.69875 3.57179 6.46205 3.57179H4.3192V3.57031C4.3192 3.57031 4.12733 3.57031 3.89062 3.57031C3.65393 3.57031 3.46205 3.57031 3.46205 3.57031V3.57179H1.3192C1.08251 3.57179 0.890625 3.76367 0.890625 4.00037C0.890625 4.23707 1.08251 4.42894 1.3192 4.42894H3.46205V4.43037Z"
                fill={isLight ? colorPalette.gray[900] : colorPalette.gray[600]}
              />
            </svg>
          ) : (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.46205 6.57143C3.46205 6.80813 3.65393 7 3.89062 7C4.12733 7 4.3192 6.80813 4.3192 6.57143V4.42857H6.46205C6.69875 4.42857 6.89062 4.2367 6.89062 4C6.89062 3.76331 6.69875 3.57143 6.46205 3.57143H4.3192V1.42857C4.3192 1.19188 4.12733 1 3.89062 1C3.65393 1 3.46205 1.19188 3.46205 1.42857V3.57143H1.3192C1.08251 3.57143 0.890625 3.76331 0.890625 4C0.890625 4.2367 1.08251 4.42857 1.3192 4.42857H3.46205V6.57143Z"
                fill={isLight ? colorPalette.gray[900] : colorPalette.gray[600]}
              />
            </svg>
          )}
        </CollapseIndicator>
      </TransactionSummary>
      <TransactionDetails>
        <TxContainer>
          <TxHash txHash={txHash} />
        </TxContainer>
        <Divider />
        <TargetContainer>
          <TargetType>{isIncomingTransaction ? 'Sender Address' : 'Recipient Address'}</TargetType>
          <WalletContainer>
            <TransactionWalletInfo name={counterPartyName} address={counterPartyAddress} />
          </WalletContainer>
        </TargetContainer>
      </TransactionDetails>
    </Accordion>
  );
};

export default MobileTransaction;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
    boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',

    '&:before': {
      display: 'none',
    },
  })
);

const TransactionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)<{
  expanded: boolean;
}>(({ expanded }) => ({
  padding: expanded ? '8px 16px 0 8px' : '8px 16px 8px 8px',
  transition: 'padding 0.1s ease-in-out',
  minHeight: 'auto',

  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
}));

const TransactionDetails = styled(MuiAccordionDetails)({
  padding: 0,
});

const ArrowContainer = styled('div')({
  marginRight: 8,
  paddingTop: 8,
});

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
});

const Data = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Name = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const Date = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
}));

const Value = styled('div')<{ isGreen: boolean }>(({ theme, isGreen }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  marginTop: 7,

  '&, & > span:first-of-type': {
    color: isGreen
      ? theme.palette.isLight
        ? theme.palette.colors.green[700]
        : theme.palette.colors.green[900]
      : theme.palette.isLight
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[50],
  },
}));

const Sign = styled('span')({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
});

const Currency = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
}));

const CollapseIndicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 16,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0 6px',
  background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
}));

const TxContainer = styled('div')({
  marginLeft: 32,
});

const Divider = styled('div')(({ theme }) => ({
  marginLeft: 8,
  marginRight: 16,
  margin: '7px 16px 8px 8px',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[800]
  }`,
}));

const TargetContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 16px 8px 8px',
});

const TargetType = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  paddingRight: 14,
}));

const WalletContainer = styled('div')({
  minWidth: 'fit-content',
});
