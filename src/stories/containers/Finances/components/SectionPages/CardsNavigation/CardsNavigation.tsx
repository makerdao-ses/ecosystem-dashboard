import styled from '@emotion/styled';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CardNavigationFinance from '../../CardNavigationFinance/CardNavigationFinance';
import CardNavigationMobile from '../../CardNavigationMobile/CardNavigationMobile';
import type { NavigationCard } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  cardsNavigationInformation: NavigationCard[];
  loadMoreCards: boolean;
  handleLoadMoreCards: () => void;
}

const CardsNavigation: React.FC<Props> = ({ cardsNavigationInformation, loadMoreCards, handleLoadMoreCards }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCardsNavigation>
      <WrapperDesk>
        {cardsNavigationInformation.map((card: NavigationCard, index) => (
          <CardNavigationFinance
            href={card.href}
            image={card.image}
            title={card.title}
            description={card.description || ''}
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
            image={card.image}
            title={card.title}
            barColor={card.color}
            key={index}
          />
        ))}
        {loadMoreCards && (
          <ContainerButton>
            <DividerStyle isLight={isLight} />
            <BigButtonStyled title={'Load More'} onClick={handleLoadMoreCards} />
            <DividerStyle isLight={isLight} />
          </ContainerButton>
        )}
      </WrapperMobile>
    </ContainerCardsNavigation>
  );
};

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
  },
  [lightTheme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const ContainerButton = styled.div({
  width: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  marginTop: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },
});
const DividerStyle = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#D4D9E1' : '#405361',
  height: 1,
  display: 'flex',
  flex: 1,
}));

const BigButtonStyled = styled(BigButton)({
  minWidth: 127,
  height: 31,
  padding: '8px 24px',
  letterSpacing: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    minWidth: 207,
  },
});
