import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../../../core/context/ThemeContext';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  logo: ReactNode | JSX.Element;
  background?: string;
  fontSize?: number | string;
  color?: string;
  fontWeight?: number;
  link?: string;
  fontFamily?: string;
  padding?: string;
  subtract?: ReactNode | JSX.Element;
  description: string;
  height?: string;
  letterSpacing?: string;
  lineHeight?: string;
  colorDark?: string;
}

export const ItemWebSite = ({
  fontSize = 16,
  fontWeight = 700,
  color = '#FFFFFF',
  fontFamily = 'Inter, sans-serif',
  colorDark,
  subtract = '',
  description,
  height = '134px',
  ...props
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Link href={props.link || ''} passHref legacyBehavior>
      <Container height={height} isLight={isLight} target="_blank">
        <ContainerRow>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ContainerLogo>{props.logo}</ContainerLogo>
            {props.title && (
              <Typography
                fontSize={fontSize}
                color={isLight ? color : colorDark}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                letterSpacing={props.letterSpacing}
                lineHeight={props.lineHeight}
              >
                {props.title}
              </Typography>
            )}
            {subtract && <ContainerSubtract>{subtract}</ContainerSubtract>}
          </div>
          <LinkWrapper>
            <CustomButton
              label="Visit Website"
              style={{
                width: '137px',
                height: '34px',
                padding: '8px 24px',
              }}
              styleText={{
                color: isLight ? '#31424E' : '#D2D4EF',
              }}
            />
          </LinkWrapper>
        </ContainerRow>
        <ContainerTextDescription>
          <TypographyDescription isLight={isLight}>{description}</TypographyDescription>
        </ContainerTextDescription>
        <BottomLinkWrapper>
          <CustomButton
            label="Visit Website"
            style={{
              width: '137px',
              height: '34px',
              padding: '8px 24px',
              borderColor: isLight ? '#D4D9E1' : '#D2D4EF',
            }}
            styleText={{
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
            }}
          />
        </BottomLinkWrapper>
      </Container>
    </Link>
  );
};

const LinkWrapper = styled.div({
  display: 'none',
  '@media (min-width: 635px)': {
    display: 'flex',
  },
});

const BottomLinkWrapper = styled.div({
  display: 'flex',
  marginTop: '24px',
  width: '100%',
  justifyContent: 'flex-end',
  '@media (min-width: 635px)': {
    display: 'none',
  },
});

const Container = styled.a<{ height?: string; isLight: boolean }>(({ height, isLight }) => ({
  display: 'block',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: isLight ? '#FFFFFF' : '#10191F',
  border: isLight ? '1px solid #D2D4EF' : '1px solid #405361',
  borderRadius: '6px',
  padding: '16px',
  width: '100%',
  height: 'fit-content',
  marginBottom: '16px',
  textDecoration: 'none',

  '&:hover': {
    background: isLight ? '#ECF1F3' : '#1E2C37',
  },

  '@media (min-width: 635px)': {
    maxWidth: '497px',
    height,
    padding: '16px 24px',
  },
}));

const ContainerRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});
const ContainerLogo = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
});

const ContainerTextDescription = styled.div({
  display: 'flex',
  marginTop: '16px',
  wordWrap: 'break-word',
  whiteSpace: 'initial',
});

const ContainerSubtract = styled.div<{ background?: string; padding?: string }>(({ background, padding }) => ({
  background: background || 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px',
  padding: padding || 0,
}));
const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#EDEFFF',
}));

export default ItemWebSite;
