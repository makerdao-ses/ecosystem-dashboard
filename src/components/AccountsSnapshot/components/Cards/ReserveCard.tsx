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
        <InitialBalance isGroup={isGroup}>
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
  borderRadius: 12,

  '&:not(:last-of-type)': {
    marginBottom: 8,
  },

  '&:before': {
    display: 'none',
  },
});

const Card = styled(MuiAccordionSummary)<{ hasTransactions: boolean }>(({ theme, hasTransactions }) => ({
  padding: '8px 24px 16px',
  background: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderRadius: 12,
  zIndex: 1,
  // !important is required to override default cursor style
  cursor: hasTransactions ? 'pointer' : 'auto!important',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 0,
  },

  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.isLight ? '#ffffff' : '#1E2C37',
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%',
    flexDirection: 'column',

    [theme.breakpoints.up('tablet_768')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
}));

const TransactionContainer = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,

  '& > div > div': {
    marginTop: -6,
    paddingTop: 14,
  },

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 24,

    '& > div > div': {
      paddingTop: 8,
    },
  },
}));

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingTop: 12,

  [theme.breakpoints.up('tablet_768')]: {
    width: '168px',
    padding: '0 8px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: '200px',
    paddingLeft: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '300px',
  },
}));

const WalletInfoWrapper = styled('div')(({ theme }) => ({
  marginTop: -11,
  marginBottom: 1,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    marginBottom: 0,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const InitialBalance = styled('div')<{ isGroup?: boolean }>(({ theme, isGroup }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: isGroup ? 24 : 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    marginTop: 0,
    justifyContent: 'normal',
    alignItems: 'normal',
    padding: '13px 2px',
    width: '14%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px',
    width: '18.6%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '16.6%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '17.3%',
  },
}));

const Header = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 2,
  },
}));

const Value = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Currency = styled('span')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const Inflow = styled('div')(({ theme }) => ({
  marginLeft: -16,
  marginRight: -16,
  marginTop: 8,
  padding: '7px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    margin: '0 8px',
    padding: '3px 7px 7px',
    justifyContent: 'normal',
    alignItems: 'normal',
    minWidth: 'calc(16.7% - 4px)',

    '& > div:first-of-type': {
      marginBottom: 0,
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '8px 16px',
    minWidth: 'calc(18.5% - 32px)',

    '& > div:first-of-type': {
      marginBottom: 4,
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 'calc(16.5% - 32px)',
    padding: '3px 15px 7px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 'calc(17.2% - 32px)',
  },
}));

const Outflow = styled(Inflow)({});

const NewBalance = styled(InitialBalance)(({ theme }) => ({
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    padding: 2,
    marginLeft: 'auto',
    marginRight: 8,
    width: 'unset',

    '& > div': {
      textAlign: 'right',
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px 13px 16px',
    width: 'auto',
  },
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  width: 47,
  display: 'flex',
  alignItems: 'center',
  padding: '8px 18.5px',

  [theme.breakpoints.up('desktop_1024')]: {
    width: 'auto',
    padding: '8px 19px 8px 19px',
    justifyContent: 'center',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '8px 48px 8px 38px',
  },
}));

const Arrow = styled('svg')<{ hasTransactions?: boolean; isExpanded: boolean; isGroup: boolean }>(
  ({ theme, hasTransactions, isExpanded, isGroup }) => ({
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease-in-out',
    marginTop: isGroup ? -5 : -15,
    marginRight: 3,
    visibility: hasTransactions ? 'visible' : 'hidden',

    [theme.breakpoints.up('tablet_768')]: {
      marginTop: 0,
    },

    [theme.breakpoints.up('desktop_1024')]: {
      marginRight: 0,
    },
  })
);
