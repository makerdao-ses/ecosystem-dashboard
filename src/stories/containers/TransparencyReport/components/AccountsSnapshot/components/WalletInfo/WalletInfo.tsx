import styled from '@emotion/styled';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { formatAddressForOutput } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import Blockies from 'react-18-blockies';
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
        <Blockies seed={address ?? name} size={10} scale={3.2} />
      </BlockiesContainer>
      <InfoContainer>
        <NameContainer>
          <Name isLight={isLight}>{name}</Name>
          <InfoIcon isLight={isLight} />
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
    marginTop: 10,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 8,
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
    fontSize: 14,
    lineHeight: '17px',
    marginBottom: 6,
  },
}));

const InfoIcon = styled(Information)<WithIsLight>(({ isLight }) => ({
  fill: isLight ? '#D1DEE6' : '#7C6B95',
  marginTop: 1,
  minWidth: 15,
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
