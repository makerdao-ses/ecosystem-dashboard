import { styled, useMediaQuery } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { useState } from 'react';
import TransactionList from '../TransactionList/TransactionList';
import WalletInfo from '../WalletInfo/WalletInfo';
import type { Theme } from '@mui/material';
import type { AccordionProps } from '@mui/material/Accordion';
import type { Token, UIReservesData } from '@ses/core/models/dto/snapshotAccountDTO';

interface ReserveCardProps {
  account: UIReservesData;
  currency?: Token;

  // intended to be use in the stories
  defaultExpanded?: boolean;
}

const ReserveCard: React.FC<ReserveCardProps> = ({ account, currency = 'DAI', defaultExpanded = false }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  const isGroup = account.accountType === 'group';
  const initialBalance = account.snapshotAccountBalance?.[0]?.initialBalance ?? 0;
  const inflow = account.snapshotAccountBalance?.[0]?.inflow ?? 0;
  const outflow =
    (account.snapshotAccountBalance?.[0]?.outflow
      ? account.snapshotAccountBalance?.[0]?.outflow * -1
      : account.snapshotAccountBalance?.[0]?.outflow) ?? 0;
  const newBalance = account.snapshotAccountBalance?.[0]?.newBalance ?? 0;

  const hasTransactions = isGroup ? !!account.children?.length : !!account.snapshotAccountTransaction?.length;

  const SVG = (
    <Arrow
      hasTransactions={hasTransactions}
      isExpanded={expanded}
      isGroup={isGroup}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.69339 5.86308C4.85404 6.04564 5.14598 6.04564 5.30664 5.86308L9.90358 0.639524C10.1255 0.38735 9.93978 0 9.59696 0H0.403059C0.0602253 0 -0.125491 0.38735 0.0964331 0.639525L4.69339 5.86308Z"
        fill={'#546978'}
      />
    </Arrow>
  );

  return (
    <Accordion expanded={expanded} onChange={() => hasTransactions && setExpanded(!expanded)}>
      <Card hasTransactions={hasTransactions}>
        <NameContainer>
          {isGroup ? (
            <Name>{account?.accountLabel}</Name>
          ) : (
            <WalletInfoWrapper>
              <WalletInfo name={account.accountLabel} address={account.accountAddress ?? ''} />
            </WalletInfoWrapper>
          )}
          {isMobile && SVG}
        </NameContainer>
        <InitialBalance>
          <Header>Initial Balance</Header>
          <Value>
            {usLocalizedNumber(initialBalance)} <Currency>{currency}</Currency>
          </Value>
        </InitialBalance>
        <Inflow>
          <Header>Inflow</Header>
          <Value>
            + {usLocalizedNumber(inflow)} <Currency>{currency}</Currency>
          </Value>
        </Inflow>
        <Outflow>
          <Header>Outflow</Header>
          <Value>
            - {usLocalizedNumber(outflow)} <Currency>{currency}</Currency>
          </Value>
        </Outflow>
        <NewBalance>
          <Header>New Balance</Header>
          <Value>
            {usLocalizedNumber(newBalance)} <Currency>{currency}</Currency>
          </Value>
        </NewBalance>
        {!isMobile && <ArrowContainer>{SVG}</ArrowContainer>}
      </Card>
      {hasTransactions && (
        <TransactionContainer>
          <TransactionList items={isGroup ? account.children : account.snapshotAccountTransaction} />
        </TransactionContainer>
      )}
    </Accordion>
  );
};

export default ReserveCard;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',
  borderRadius: '6px',

  '&:not(:last-of-type)': {
    marginBottom: 8,
  },

  '&:before': {
    display: 'none',
  },
});

const Card = styled(MuiAccordionSummary)<{ hasTransactions: boolean }>(({ theme, hasTransactions }) => ({
  padding: '16px 24px 24px',
  background: theme.palette.isLight ? '#ffffff' : '#1E2C37',
  boxShadow: theme.palette.isLight
    ? '0px 4px 6px rgba(196, 196, 196, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: 6,
  zIndex: 1,
  // !important is required to override default cursor style
  cursor: hasTransactions ? 'pointer' : 'auto!important',

  [theme.breakpoints.up('table_834')]: {
    padding: 0,
  },

  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.isLight ? '#ffffff' : '#1E2C37',
  },

  '&.Mui-expanded': {
    [theme.breakpoints.down('table_834')]: {
      borderRadius: '6px 6px 0 0',
    },
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%',
    flexDirection: 'column',

    [theme.breakpoints.up('table_834')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
}));

const TransactionContainer = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.up('table_834')]: {
    marginBottom: 24,
  },
}));

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.up('table_834')]: {
    width: '220px',
    padding: '0 16px',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    width: '300px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '300px',
  },
}));

const WalletInfoWrapper = styled('div')(({ theme }) => ({
  paddingTop: 3,
  marginBottom: 1,

  [theme.breakpoints.up('table_834')]: {
    paddingTop: 0,
    margin: 0,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 12,
    lineHeight: '17px',
  },
}));

const InitialBalance = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 24,

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    marginTop: 0,
    justifyContent: 'normal',
    alignItems: 'normal',
    padding: '16px 2px',
    width: '17.08%',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    padding: 16,
    width: '16.8%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '17.1%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '17.9%',
  },
}));

const Header = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#708390' : '#708390',

  [theme.breakpoints.up('table_834')]: {
    fontSize: 11,
    lineHeight: '13px',
    marginBottom: 8,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const Value = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Currency = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));

const Inflow = styled('div')(({ theme }) => ({
  marginLeft: -16,
  marginRight: -16,
  marginTop: 8,
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.isLight ? 'rgba(236, 239, 249, 0.5)' : 'rgba(72, 73, 95, 0.25)',

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    margin: '8px 2px',
    padding: 8,
    justifyContent: 'normal',
    alignItems: 'normal',
    minWidth: 'calc(16.1% - 4px)',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    margin: '8px 16px',
    minWidth: 'calc(16.8% - 32px)',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 'calc(17.2% - 32px)',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 'calc(18% - 32px)',
  },
}));

const Outflow = styled(Inflow)({});

const NewBalance = styled(InitialBalance)(({ theme }) => ({
  marginTop: 7,

  [theme.breakpoints.up('table_834')]: {
    padding: 2,
    marginLeft: 'auto',
    width: 'unset',

    '& > div': {
      textAlign: 'right',
    },
  },

  [theme.breakpoints.up('desktop_1194')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px 16px 16px',
    width: 'auto',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 32px 16px 16px',
  },
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  width: 47,
  display: 'flex',
  alignItems: 'center',
  padding: '8px 18.5px',

  [theme.breakpoints.up('desktop_1194')]: {
    width: 72,
    justifyContent: 'center',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 32,
  },
}));

const Arrow = styled('svg')<{ hasTransactions?: boolean; isExpanded: boolean; isGroup: boolean }>(
  ({ theme, hasTransactions, isExpanded, isGroup }) => ({
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease-in-out',
    marginTop: isGroup ? -4 : -30,
    marginRight: -5,
    visibility: hasTransactions ? 'visible' : 'hidden',

    [theme.breakpoints.up('table_834')]: {
      marginTop: 0,
    },

    [theme.breakpoints.up('desktop_1194')]: {
      width: 16,
      height: 10,
      marginRight: 0,
    },
  })
);
