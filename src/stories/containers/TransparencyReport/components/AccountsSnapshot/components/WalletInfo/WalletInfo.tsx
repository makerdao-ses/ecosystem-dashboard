import styled from '@emotion/styled';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import Identicon from '@ses/components/Identicon/Identicon';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { formatAddressForOutput } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface WalletInfoProps {
  name: string;
  address: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ name, address }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <BlockiesContainer>
        <BlockieIdenticon address={address ?? name} />
      </BlockiesContainer>
      <InfoContainer>
        <NameContainer>
          <Name isLight={isLight}>{name}</Name>
        </NameContainer>
        <AddressContainer>
          <Address isLight={isLight} href={`https://etherscan.io/address/${address}`} target="_blank">
            {formatAddressForOutput(address, 6, 4, '...')}
          </Address>
          <CopyIcon text={address ?? ''} defaultTooltip="Copy Address" />
        </AddressContainer>
      </InfoContainer>
    </Container>
  );
};

export default WalletInfo;

const Container = styled.div({
  display: 'flex',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 4,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 3,
  },
});

const BlockiesContainer = styled.div({
  width: 32,
  height: 32,
  minWidth: 32,
  borderRadius: '50%',
  marginRight: 16,
  marginTop: 2,
  overflow: 'hidden',
  background: 'gray',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: 1,
  },
});

const BlockieIdenticon = styled(Identicon)({
  width: 32,
  height: 32,
});

const InfoContainer = styled.div({});

const NameContainer = styled.div({
  display: 'flex',
});

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 4,
  marginRight: 8.5,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 12,
    lineHeight: '17px',
    marginBottom: 6,
    marginRight: 4,
  },
}));

const AddressContainer = styled.div({
  display: 'flex',
});

const Address = styled.a<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#447AFB' : '#447AFB',
  marginRight: 17,

  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 2,
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));
