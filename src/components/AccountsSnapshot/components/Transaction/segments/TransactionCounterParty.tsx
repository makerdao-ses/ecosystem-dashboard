import { styled } from '@mui/material';
import TransactionWalletInfo from '../TransactionWalletInfo';

interface TransactionCounterPartyProps {
  isIncomingTransaction: boolean;
  name: string;
  address: string;
}

const TransactionCounterParty: React.FC<TransactionCounterPartyProps> = ({ isIncomingTransaction, name, address }) => (
  <Wrapper>
    <CounterPartyRole>{isIncomingTransaction ? 'Sender Address' : 'Recipient Address'}</CounterPartyRole>
    <TransactionWalletInfo name={name} address={address} />
  </Wrapper>
);

export default TransactionCounterParty;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingRight: 10,

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: -2,
  },
}));

const CounterPartyRole = styled('div')(({ theme }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: theme.palette.isLight ? '#546978' : '#708390',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));
