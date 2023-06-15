import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import TransactionList from '../TransactionList/TransactionList';
import WalletInfo from '../WalletInfo/WalletInfo';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ReserveCardProps {
  name: string;
  address?: string;
  isGroup?: boolean;
  initialBalance: number;
  inflow: number;
  outflow: number;
  newBalance: number;
  currency?: 'DAI' | 'ETH' | 'MKR';
}

const ReserveCard: React.FC<ReserveCardProps> = ({
  name,
  address,
  isGroup = false,
  initialBalance,
  inflow,
  outflow,
  newBalance,
  currency = 'DAI',
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const SVG = (
    <Arrow
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
        fill={isLight ? '#546978' : '#546978'}
      />
    </Arrow>
  );

  return (
    <Accordion onChange={() => setExpanded(!expanded)}>
      <Card isLight={isLight}>
        <NameContainer>
          {isGroup ? (
            <Name isLight={isLight}>{name}</Name>
          ) : (
            <WalletInfoWrapper>
              <WalletInfo name={name} address={address ?? ''} />
            </WalletInfoWrapper>
          )}
          {isMobile && SVG}
        </NameContainer>
        <InitialBalance>
          <Header isLight={isLight}>Initial Balance</Header>
          <Value isLight={isLight}>
            {usLocalizedNumber(initialBalance)} <Currency isLight={isLight}>{currency}</Currency>
          </Value>
        </InitialBalance>
        <Inflow isLight={isLight}>
          <Header isLight={isLight}>Inflow</Header>
          <Value isLight={isLight}>
            + {usLocalizedNumber(inflow)} <Currency isLight={isLight}>{currency}</Currency>
          </Value>
        </Inflow>
        <Outflow isLight={isLight}>
          <Header isLight={isLight}>Outflow</Header>
          <Value isLight={isLight}>
            - {usLocalizedNumber(outflow)} <Currency isLight={isLight}>{currency}</Currency>
          </Value>
        </Outflow>
        <NewBalance>
          <Header isLight={isLight}>New Balance</Header>
          <Value isLight={isLight}>
            {usLocalizedNumber(newBalance)} <Currency isLight={isLight}>{currency}</Currency>
          </Value>
        </NewBalance>
        {!isMobile && <ArrowContainer>{SVG}</ArrowContainer>}
      </Card>
      <TransactionContainer>
        <TransactionList showGroup={true} />
      </TransactionContainer>
    </Accordion>
  );
};

export default ReserveCard;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',
  marginBottom: 8,
  borderRadius: '6px',

  '&:before': {
    display: 'none',
  },
});

const Card = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)<WithIsLight>(
  ({ isLight }) => ({
    padding: '16px 24px 24px',
    background: isLight ? '#ffffff' : '#1E2C37',
    boxShadow: isLight
      ? '0px 4px 6px rgba(196, 196, 196, 0.25)'
      : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
    borderRadius: 6,
    zIndex: 1,

    [lightTheme.breakpoints.up('table_834')]: {
      padding: 0,
    },

    '&.Mui-expanded': {
      [lightTheme.breakpoints.down('table_834')]: {
        borderRadius: '6px 6px 0 0',
      },
    },

    '& .MuiAccordionSummary-content': {
      margin: 0,
      width: '100%',
      flexDirection: 'column',

      [lightTheme.breakpoints.up('table_834')]: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
  })
);

const TransactionContainer = styled(MuiAccordionDetails)(() => ({
  padding: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 24,
  },
}));

const NameContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    width: '22.7%',
    padding: '0 16px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: '18.7%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '18.4%',
  },
});

const WalletInfoWrapper = styled.div({
  paddingTop: 3,
  marginBottom: -6,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 0,
    margin: 0,
  },
});

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));

const InitialBalance = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    marginTop: 0,
    justifyContent: 'normal',
    alignItems: 'normal',
    padding: '16px 8px',
    width: '17.1%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: 16,
    width: '18.8%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '18.4%',
  },
});

const Header = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#708390' : '#708390',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 11,
    lineHeight: '13px',
    marginBottom: 8,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Currency = styled.span<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));

const Inflow = styled.div<WithIsLight>(({ isLight }) => ({
  marginLeft: -16,
  marginRight: -16,
  marginTop: 8,
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: isLight ? 'rgba(236, 239, 249, 0.5)' : 'rgba(72, 73, 95, 0.25)',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    margin: 8,
    padding: 8,
    justifyContent: 'normal',
    alignItems: 'normal',
    width: '16%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '8px 16px',
    width: '15.9%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '16.2%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '16%',
  },
}));

const Outflow = styled(Inflow)({});

const NewBalance = styled(InitialBalance)({
  marginTop: 8,

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '16px 8px',
    marginLeft: 'auto',

    '& > div': {
      textAlign: 'right',
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: 16,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px 16px 16px',
    width: 'auto',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 32px 16px 16px',
  },
});

const ArrowContainer = styled.div({
  width: 47,
  display: 'flex',
  alignItems: 'center',
  padding: '8px 18.5px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 72,
    justifyContent: 'center',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 106,
  },
});

const Arrow = styled.svg<{ isExpanded: boolean; isGroup: boolean }>(({ isExpanded, isGroup }) => ({
  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.2s ease-in-out',
  marginTop: isGroup ? -4 : -30,
  marginRight: -5,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 16,
    height: 10,
    marginRight: 0,
  },
}));
