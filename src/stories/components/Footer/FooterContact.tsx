import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SES_DASHBOARD } from '../../../core/utils/const';
import { FooterLinks } from './FooterLinks';
import type { TypeIconFooter } from './FooterLinks';
import type { CSSProperties } from 'react';

interface Props {
  title: string;
  subtitle: string;
  logo: JSX.Element;
  links: TypeIconFooter[];
  style?: CSSProperties;
  isLink?: boolean;
}

export const FooterContact = ({ title, subtitle, logo, links, style, isLink = false }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <ContainerText>
        {isLink ? (
          <StyleTitleLink isLight={isLight} href={SES_DASHBOARD} target="_blank">
            {title}
          </StyleTitleLink>
        ) : (
          <StyleTitle isLight={isLight} style={{ paddingBottom: '16px' }}>
            {title}
          </StyleTitle>
        )}
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
  marginBottom: '24px',
});

const StyleTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isLight',
})<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D1DEE6',
}));

const StyleTitleLink = styled.a<{ isLight: boolean }>(({ isLight }) => ({
  display: 'inline-block',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D1DEE6',
  marginBottom: '16px',
}));

const StyleDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'FT Base, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19.2px',
    letterSpacing: '0.4px',
    color: isLight ? '#231536' : '#D1DEE6',
  })
);

const ContainerLogo = styled.div({
  marginTop: '38px',
});

export default FooterContact;
