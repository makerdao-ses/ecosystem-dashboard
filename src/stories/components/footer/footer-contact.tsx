import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { FooterLinks, TypeIconFooter } from './footer-link';

interface Props {
  title: string
  subtitle: string
  logo: JSX.Element
  links: TypeIconFooter[]

}

export const FooterContact = ({ title, subtitle, logo, links }: Props) => {
  return (
    <Container>
      <ContainerText >
        <StyleTitle sx={{ marginBottom: '16px' }}>{title}</StyleTitle>
        <StyleDescription>{subtitle}</StyleDescription>

      </ContainerText>
      <div style={{
        display: 'flex',
        paddingLeft: '6.13px'
      }}> <FooterLinks links={links} /></div>
      <ContainerLogo >{logo}</ContainerLogo>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const ContainerText = styled.div({
  marginBottom: '16px'
});

const StyleTitle = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  letterSpacing: '0.4px',
  color: '#000000',
});

const StyleDescription = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#333333',
  letterSpacing: '0.4px',
});

const ContainerLogo = styled.div({
  marginTop: '32px'
});

export default FooterContact;
