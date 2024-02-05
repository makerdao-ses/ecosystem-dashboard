import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import CircleWithArrow from '@ses/components/svg/CircleWithArrow';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Image from 'next/image';
import React from 'react';
import { hasSubLevels } from '../../utils/utils';
import CardNavigationGeneric from '../CardNavigationGeneric';
import ReadMore from '../ReadMore';
import { truncateDescription } from './utils';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  image: string;
  title: string;
  description: string;
  href: string;
  allBudgets: Budget[];
  codePath: string;
}

const CardNavigationFinance: React.FC<Props> = ({ image, title, description, href, allBudgets, codePath }) => {
  const { isLight } = useThemeContext();
  const isHasSubLevels = hasSubLevels(codePath, allBudgets);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const truncatedDescription = truncateDescription(description);

  return (
    <StyleCardNavigationGeneric>
      <ContainerImage>
        <ImageStyle src={image} width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} alt="Picture" unoptimized />
      </ContainerImage>
      <ContainerWithButton>
        <CardInformation>
          <Title isLight={isLight}>{title}</Title>
          <Description isLight={isLight}>{truncatedDescription}</Description>
        </CardInformation>
      </ContainerWithButton>
      <ContainerReadMore>
        {isHasSubLevels ? (
          <ReadMore href={href} />
        ) : (
          <ContainerMore isLight={isLight}>
            <ReadMoreText isLight={isLight}>Explore</ReadMoreText>
            <CircleWithArrow />
          </ContainerMore>
        )}
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

const ContainerMore = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  borderRadius: 22,
  border: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  background: isLight ? '#FFF' : 'transparent',
  padding: '5px 5px 5px 16px',
  opacity: 0.6,
}));

const ReadMoreText = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#9FAFB9',
  fontSize: 13,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '18px',
}));
