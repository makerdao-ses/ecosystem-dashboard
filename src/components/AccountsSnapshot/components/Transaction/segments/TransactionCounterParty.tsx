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
  gap: 4,
  paddingRight: 10,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: -2,
  },
}));

const CounterPartyRole = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));
