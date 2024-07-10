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

  [theme.breakpoints.up('tablet_768')]: {
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
  marginRight: 8,
  marginTop: 4,
  overflow: 'hidden',
  background: 'gray',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 1,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginRight: 16,
    marginTop: 8,
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
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '900',
  marginRight: 8.5,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: 2,
  },
}));

const AddressContainer = styled('div')({
  display: 'flex',
});

const Address = styled('a')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.colors.blue[700],
  marginRight: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 2,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));
