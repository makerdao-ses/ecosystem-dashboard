import styled from '@emotion/styled';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { formatAddressForOutput } from '@ses/core/utils/string';
import React from 'react';
import Blockies from 'react-18-blockies';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransactionWalletInfoProps {
  name: string;
  address: string;
  className?: string;
}

const TransactionWalletInfo: React.FC<TransactionWalletInfoProps> = ({ name, address, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <Container {...props}>
      <BlockiesContainer>
        <Blockies seed={address ?? name} size={10} scale={3} />
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

export default TransactionWalletInfo;

const Container = styled.div({
  display: 'flex',
});

const BlockiesContainer = styled.div({
  width: 24,
  height: 24,
  borderRadius: '50%',
  marginRight: 8,
  marginTop: 6,
  overflow: 'hidden',
  background: 'gray',
});

const InfoContainer = styled.div({});

const NameContainer = styled.div({
  display: 'flex',
});

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 5,
}));

const AddressContainer = styled.div({
  display: 'flex',
});

const Address = styled.a<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#447AFB' : '#447AFB',
  marginRight: 17,
}));
