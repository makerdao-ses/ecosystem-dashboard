import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import Image from 'next/image';
import React from 'react';
import CardNavigationGeneric from '../CardNavigationGeneric';
import ReadMore from '../ReadMore';
import { truncateDescription } from './utils';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  image: string;
  title: string;
  description: string;
  href: string;
  code?: string;
}

const CardNavigationFinance: React.FC<Props> = ({ image, title, description, href, code }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const truncatedDescription = truncateDescription(description);

  const showCode = code && code.length > 0;
  const showCodeBelow =
    showCode &&
    (code.toLocaleLowerCase() === code ||
      (code.includes('-') && code.toUpperCase() !== code) ||
      /[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/.test(code));

  return (
    <StyleCardNavigationGeneric>
      <ContainerImage>
        <ImageStyle src={image} width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} alt="Picture" unoptimized />
      </ContainerImage>
      <ContainerWithButton>
        <CardInformation>
          <Title isLight={isLight}>
            {showCode && !showCodeBelow && <Code isLight={isLight}>{code}</Code>} {title}
          </Title>
          {showCodeBelow && (
            <Title isLight={isLight}>
              <Code isLight={isLight}>{code}</Code>
            </Title>
          )}
          <Description isLight={isLight}>{truncatedDescription}</Description>
        </CardInformation>
      </ContainerWithButton>
      <ContainerReadMore>
        <ReadMore href={href} />
      </ContainerReadMore>
    </StyleCardNavigationGeneric>
  );
};

export default CardNavigationFinance;

const StyleCardNavigationGeneric = styled(CardNavigationGeneric)({
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '16px 8px 24px',
    flex: 1,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 8px 24px',
    minWidth: 'calc(20% - 13px)',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 'calc(20% - 20px)',
  },
});

const ContainerImage = styled.div({
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

const Code = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#B6BCC2' : '#546978',
  fontWeight: 600,
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  maxWidth: 208,
  color: isLight ? '#708390' : '#708390',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 293.3,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 236,
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
  marginTop: 6,
});

const ContainerWithButton = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
});
