import React from 'react';
import styled from '@emotion/styled';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomLink } from '../custom-link/custom-link';
import { capitalizeSentence } from '../../../core/utils/string.utils';

interface WalletTableCellProps {
  imgUrl?: string,
  name: string,
  wallet: string,
}

export const WalletTableCell = (props: WalletTableCellProps) => {
  return <Container>
    <CircleAvatar
      width={'32px'}
      height={'32px'}
      name={props.name}
      image={props.imgUrl}
      style={{ margin: '0 16px' }}
    />
    <Data>
      <Label>{capitalizeSentence(props.name)}</Label>
      <CustomLink
        style={{ pointerEvents: 'none' }}
        fontSize={14}
        fontWeight={400}
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
});

const Data = styled.div({});

const Label = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#231536',
  marginBottom: '4px'
});
