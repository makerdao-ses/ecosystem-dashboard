import styled from '@emotion/styled';
import { Link, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  title: string
  logo: ReactNode | JSX.Element
  background?: string
  fontSize?: number
  color?: string
  fontWeight?: number
  link?: string
  fontFamily?: string
}

export const ItemWebSite = ({ background = '', fontSize = 16, fontWeight = 700, color = '#FFFFFF', link = '#', fontFamily = 'Inter', ...props }: Props) => {
  return (
    <ContainerLink href={link} target='_blank'>
      <ContainerLogo>{props.logo}</ContainerLogo>
      <ContainerText background={background}>
        <Typography fontSize={fontSize} color={color} fontWeight={fontWeight} fontFamily={fontFamily }>{props.title}</Typography>
      </ContainerText>
    </ContainerLink>
  );
};

const ContainerLink = styled(Link)({
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
const ContainerText = styled.div<{ background?: string }>((props) => ({
  background: props.background || 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px',
  padding: '4px 8px',
}));

export default ItemWebSite;
