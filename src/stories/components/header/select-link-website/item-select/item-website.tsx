import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  title: string
  logo: ReactNode | JSX.Element
  background?: string
  fontSize?: number | string
  color?: string | string
  fontWeight?: number
  link?: string
  fontFamily?: string
  padding?: string
  subtract?: ReactNode | JSX.Element
}

export const ItemWebSite = ({ background = '', fontSize = 16, fontWeight = 700, color = '#FFFFFF', link = '#', fontFamily = 'Inter', subtract = '', ...props }: Props) => {
  return (
    <ContainerLink href={link} target='_blank'>
      <ContainerLogo>{props.logo}</ContainerLogo>
      {props.title && <ContainerText background={background} padding={props.padding}>
        <Typography fontSize={fontSize} color={color} fontWeight={fontWeight} fontFamily={fontFamily} >{props.title}</Typography>
      </ContainerText>}
      <ContainerSubtract>{subtract}</ContainerSubtract>
    </ContainerLink>
  );
};

const ContainerLink = styled.a({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 'fit-content',
  textDecoration: 'none',
});

const ContainerLogo = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
});
const ContainerText = styled.div<{ background?: string, padding?: string }>((props) => ({
  background: props.background || 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  padding: props.padding || 0,
}));
const ContainerSubtract = styled.div<{ background?: string, padding?: string }>((props) => ({
  background: props.background || 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px',
  padding: props.padding || 0,
}));

export default ItemWebSite;
