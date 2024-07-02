import { styled } from '@mui/material';
import Identicon from '@ses/components/Identicon/Identicon';
import { formatAddressForOutput } from '@ses/core/utils/string';
import CopyIcon from '@/components/CopyIcon/CopyIcon';

interface WalletInfoProps {
  name: string;
  address: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ name, address }) => (
  <Container>
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

export default WalletInfo;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('table_834')]: {
    marginTop: 4,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 3,
  },
}));

const BlockiesContainer = styled('div')(({ theme }) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  borderRadius: '50%',
  marginRight: 16,
  marginTop: 2,
  overflow: 'hidden',
  background: 'gray',

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: 1,
  },
}));

const BlockieIdenticon = styled(Identicon)({
  width: 32,
  height: 32,
});

const InfoContainer = styled('div')({});

const NameContainer = styled('div')({
  display: 'flex',
});

const Name = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom: 4,
  marginRight: 8.5,

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 12,
    lineHeight: '17px',
    marginBottom: 6,
    marginRight: 4,
  },
}));

const AddressContainer = styled('div')({
  display: 'flex',
});

const Address = styled('a')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#447AFB' : '#447AFB',
  marginRight: 17,

  [theme.breakpoints.up('table_834')]: {
    marginRight: 2,
  },

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));
