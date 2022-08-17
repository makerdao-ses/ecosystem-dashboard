import React from 'react';
import styled from '@emotion/styled';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomLink } from '../custom-link/custom-link';
import { capitalizeSentence } from '../../../core/utils/string.utils';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface WalletTableCellProps {
  imgUrl?: string;
  name: string;
  wallet: string;
  address?: string;
}

export const WalletTableCell = (props: WalletTableCellProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container>
    <CircleAvatar
      width={'32px'}
      height={'32px'}
      name={props.address ?? ''}
      image={props.imgUrl}
      border={'none'}
      identIcon
    />
    <Data>
      <Label isLight={isLight}>{capitalizeSentence(props.name)}</Label>
      <CustomLink
        style={{
          margin: 0,
          lineHeight: '17px',
        }}
        fontSize={14}
        fontWeight={400}
        href={`https://etherscan.io/address/${props.address}`}
        withArrow={false}>
        {props.wallet.toLowerCase()}
      </CustomLink>
    </Data>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: '72px',
  '.circle-avatar': {
    margin: '0 16px',
    '@media (min-width: 834px) and (max-width: 1193px)': {
      margin: '0 16px 0 8px',
    },
  }
});

const Data = styled.div({
  height: '40px'
});

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '19px'
  }
}));
