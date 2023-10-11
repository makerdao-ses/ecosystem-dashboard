import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CardNavigationFinance from '../../CardNavigationFinance/CardNavigationFinance';
import CardNavigationMobile from '../../CardNavigationMobile/CardNavigationMobile';
import type { NavigationCard } from '@ses/containers/Finances/utils/types';

interface Props {
  cardsNavigationInformation: NavigationCard[];
}

const CardsNavigation: React.FC<Props> = ({ cardsNavigationInformation }) => (
  <ContainerCardsNavigation>
    <WrapperDesk>
      {cardsNavigationInformation.map((card: NavigationCard, index) => (
        <CardNavigationFinance
          href={card.href}
          svgImage={card.svgImage}
          title={card.title}
          description={card.description}
          key={index}
        />
      ))}
    </WrapperDesk>
    <WrapperMobile>
      {cardsNavigationInformation.map((card: NavigationCard, index) => (
        <CardNavigationMobile
          valueDai={card?.valueDai || 0}
          totalDai={card?.totalDai || 0}
          href={card.href}
          svgImage={card.svgImage}
          title={card.title}
          barColor={card.color}
          key={index}
        />
      ))}
    </WrapperMobile>
  </ContainerCardsNavigation>
);

export default CardsNavigation;

const ContainerCardsNavigation = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const WrapperDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    '& > div:nth-of-type(2) > div:nth-of-type(2)': {
      marginBottom: 14,
    },
    '& > div:nth-of-type(3) > div:nth-of-type(2)': {
      marginBottom: 'auto',
      height: 81,
    },
  },
  [lightTheme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    '& > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2)': {
      width: 210,
    },
    '& > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2)': {
      width: 250,
    },
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2)': {
      width: 205,
    },
    gap: 32,
  },
});
const WrapperMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});
