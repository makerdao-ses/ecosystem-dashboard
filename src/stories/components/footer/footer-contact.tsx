import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import { FooterLinks, TypeIconFooter } from './footer-link';

interface Props {
  title: string
  subtitle: string
  logo: JSX.Element
  links: TypeIconFooter[]
  style?: CSSProperties
}

export const FooterContact = ({ title, subtitle, logo, links, style }: Props) => {
  return (
    <Container>
      <ContainerText >
        <StyleTitle sx={{ marginBottom: '16px' }}>{title}</StyleTitle>
        <StyleDescription>{subtitle}</StyleDescription>
      </ContainerText>
      <FooterLinks links={links} styleLinks={style} />
      <ContainerLogo>{logo}</ContainerLogo>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ContainerText = styled.div({
  marginBottom: '24px'
});

const StyleTitle = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  letterSpacing: '0.4px',
  color: '#231536',
});

const StyleDescription = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  color: '#231536',
  lineHeight: '19.2px',
  letterSpacing: '0.4px',
});

const ContainerLogo = styled.div({
  marginTop: '38px'
});

export default FooterContact;
