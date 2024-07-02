import { styled } from '@mui/material';
import Identicon from '@ses/components/Identicon/Identicon';
import { formatAddressForOutput } from '@ses/core/utils/string';
import CopyIcon from '@/components/CopyIcon/CopyIcon';

interface TransactionWalletInfoProps {
  name: string;
  address: string;
  className?: string;
}

const TransactionWalletInfo: React.FC<TransactionWalletInfoProps> = ({ name, address, ...props }) => (
  <Container {...props}>
    <BlockiesContainer>
      <BlockieIdenticon address={address ?? name} />
    </BlockiesContainer>
    <InfoContainer>
      <NameContainer>
        <Name>{name}</Name>
      </NameContainer>
      <AddressContainer>
        <Address href={`https://etherscan.io/address/${address}`} target="_blank">
          {formatAddressForOutput(address, 6, 4, '...')}
        </Address>
        <CopyIcon text={address ?? ''} defaultTooltip="Copy Address" />
      </AddressContainer>
    </InfoContainer>
  </Container>
);

export default TransactionWalletInfo;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('desktop_1194')]: {
    alignItems: 'center',
  },
}));

const BlockiesContainer = styled('div')(({ theme }) => ({
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '50%',
  marginRight: 8,
  marginTop: 6,
  overflow: 'hidden',
  background: 'gray',

  [theme.breakpoints.up('table_834')]: {
    marginTop: 0,
    marginRight: 16,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginRight: 15,
  },
}));

const BlockieIdenticon = styled(Identicon)(({ theme }) => ({
  width: 24,
  height: 24,
  minWidth: 24,

  [theme.breakpoints.up('table_834')]: {
    width: 32,
    height: 32,
  },
}));

const InfoContainer = styled('div')({});

const NameContainer = styled('div')({
  display: 'flex',
});

const Name = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '15px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom: 4,

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const AddressContainer = styled('div')({
  display: 'flex',
});

const Address = styled('a')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '15px',
  color: '#447AFB',
  marginRight: 17,

  [theme.breakpoints.up('table_834')]: {
    marginRight: 4,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));
