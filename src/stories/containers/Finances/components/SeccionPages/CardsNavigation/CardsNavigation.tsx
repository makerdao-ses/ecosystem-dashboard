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
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
  },
});
const WrapperMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});
