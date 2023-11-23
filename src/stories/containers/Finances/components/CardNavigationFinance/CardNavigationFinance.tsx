import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Image from 'next/image';
import React from 'react';
import CardNavigationGeneric from '../CardNavigationGeneric';
import ReadMore from '../ReadMore';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  image: string;
  title: string;
  description: React.ReactNode;
  href: string;
}

const CardNavigationFinance: React.FC<Props> = ({ image, title, description, href }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  return (
    <StyleCardNavigationGeneric>
      <ContainerImage>
        <ImageStyle src={image} width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} alt="Picture" unoptimized />
      </ContainerImage>
      <CardInformation>
        <Title isLight={isLight}>{title}</Title>
        <Description isLight={isLight}>{description}</Description>
      </CardInformation>
      <ReadMore href={href} />
    </StyleCardNavigationGeneric>
  );
};

export default CardNavigationFinance;
const StyleCardNavigationGeneric = styled(CardNavigationGeneric)({
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '16px 8px 24px',
    flex: 1,
    width: 224,
    height: 250,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 8px 24px',
    width: 309.33,
    height: 235,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 373.33,
    height: 'revert',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 416,
  },
});

const ContainerImage = styled.div({
  marginBottom: 8,
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBottom: 8,
  paddingLeft: 4,
  paddingRight: 4,
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  width: 208,
  margin: '0px auto 24px',

  color: isLight ? '#708390' : '#708390',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 293.3,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 236,
  },
}));

const CardInformation = styled.div({
  textAlign: 'center',
  marginBottom: -1,
});

const ImageStyle = styled(Image)({
  borderRadius: 22,
});
