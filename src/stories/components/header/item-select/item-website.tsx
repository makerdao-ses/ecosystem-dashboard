import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  title: string
  logo: ReactNode | JSX.Element
  background?: string
  fontSize?: number
  color?: string
  fontWeight?: number
}

export const ItemWebSite = ({ background = '', fontSize = 16, fontWeight = 700, color = '#FFFFFF', ...props }: Props) => {
  return (
    <Container>
      <ContainerLogo>{props.logo}</ContainerLogo>
      <ContainerText background={background}>
        <Typography fontSize={fontSize} color={color} fontWeight={fontWeight}>{props.title}</Typography>
      </ContainerText>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 'fit-content',
});
const ContainerLogo = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
});
const ContainerText = styled.div<{ background?: string }>((props) => ({
  background: props.background || 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px',
  padding: '4px 8px',
}));

export default ItemWebSite;
