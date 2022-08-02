import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { FooterLinks, TypeIconFooter } from './footer-link';

interface Props {
  title: string
  subtitle: string
  logo: JSX.Element
  links: TypeIconFooter[]
  style?: CSSProperties
}

export const FooterContact = ({ title, subtitle, logo, links, style }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      <ContainerText >
        <StyleTitle isLight={isLight} sx={{ marginBottom: '16px' }}>{title}</StyleTitle>
        <StyleDescription isLight={isLight}>{subtitle}</StyleDescription>
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

const StyleTitle = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D1DEE6'
}));

const StyleDescription = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19.2px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D1DEE6'
}));

const ContainerLogo = styled.div({
  marginTop: '38px'
});

export default FooterContact;
