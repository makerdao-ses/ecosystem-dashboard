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
  description: string;
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
      <ContainerWithButton>
        <CardInformation>
          <Title isLight={isLight}>{title}</Title>
          <Description isLight={isLight}>{description}</Description>
        </CardInformation>
        <ContainerReadMore>
          <ReadMore href={href} />
        </ContainerReadMore>
      </ContainerWithButton>
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
    minHeight: 250,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 8px 24px',
    width: 309.33,
    height: 235,
    minHeight: 235,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 373.33,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 416,
  },
});

const ContainerImage = styled.div({
  marginBottom: 16,
  width: 64,
  height: 64,
  minWidth: 64,
  minHeight: 64,
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
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '3',
  lineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',

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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ImageStyle = styled(Image)({
  borderRadius: 22,
});

const ContainerReadMore = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: -2,
});

const ContainerWithButton = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
});
