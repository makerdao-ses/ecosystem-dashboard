import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardCoreUnitThirdLevelBudget from '../../CardCoreUnitThirdLevelBudget/CardCoreUnitThirdLevelBudget';
import CardNavigationFinance from '../../CardNavigationFinance/CardNavigationFinance';
import CardNavigationMobile from '../../CardNavigationMobile/CardNavigationMobile';
import type { Theme } from '@mui/material';
import type { NavigationCard } from '@ses/containers/Finances/utils/types';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { SwiperProps, SwiperRef } from 'swiper/react';

interface Props {
  cardsNavigationInformation: NavigationCard[];
  loadMoreCards: boolean;
  handleLoadMoreCards: () => void;
  allBudgets: Budget[];
}

const CardsNavigation: React.FC<Props> = ({
  cardsNavigationInformation,
  loadMoreCards,
  handleLoadMoreCards,
  allBudgets,
}) => {
  const { isLight } = useThemeContext();
  const ref = useRef<SwiperRef>(null);
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const MAX_ITEMS = isTablet ? 3 : 5;

  // Options of Swiper
  const swiperOptions = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
      1440: {
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
      1920: {
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
    },
  } as SwiperProps;

  return (
    <ContainerCardsNavigation>
      <WrapperDesk>
        {cardsNavigationInformation.length > MAX_ITEMS ? (
          <SwiperWrapper isLight={isLight}>
            <Swiper
              direction="horizontal"
              ref={ref}
              modules={[Pagination, Navigation]}
              centerInsufficientSlides
              pagination={true}
              {...swiperOptions}
            >
              {cardsNavigationInformation.map((coreUnit, index) => (
                <SwiperSlide key={index}>
                  <CardWrapper>
                    <CardCoreUnitThirdLevelBudget
                      code={coreUnit.code ?? ''}
                      href="#"
                      image={coreUnit.image || '/assets/img/default-icon-cards-budget.svg'}
                      name={coreUnit.title}
                    />
                  </CardWrapper>
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        ) : (
          cardsNavigationInformation.map((card: NavigationCard, index) => (
            <CardNavigationFinance
              href={card.href}
              image={card.image}
              title={card.title}
              description={card.description || ''}
              key={index}
              allBudgets={allBudgets}
              codePath={card.codePath || ''}
            />
          ))
        )}
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
    gap: 24,
  },
});

const SwiperWrapper = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  position: 'relative',

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 32,
    display: 'block',
    maxWidth: '100%',
    width: '100%',
  },

  '& .swiper-slide': {
    maxWidth: 100,

    [lightTheme.breakpoints.up('tablet_768')]: {
      maxWidth: 150,
    },
  },
  '& .swiper-pagination-horizontal': {
    position: 'relative',
    marginTop: 24,
  },
  '& .swiper-pagination > .swiper-pagination-bullet': {
    opacity: 1,
  },
  '& .swiper-pagination-bullet': {
    width: 16,
    height: 16,
    backgroundColor: isLight ? '#ECF1F3 !important' : '#1E2C37 !important',
    opacity: '1px !important',
    '&:first-child': {
      borderRadius: '20px 0px 0px 20px',
    },
    '&:last-child': {
      borderRadius: '0px 20px 20px 0px',
    },
  },

  '& .swiper-pagination-bullet-active': {
    backgroundColor: isLight ? '#2DC1B1 !important' : '#098C7D !important',
  },

  '& .swiper-slide-active': {
    marginLeft: -8,
    [lightTheme.breakpoints.up('tablet_768')]: {
      marginLeft: -16,
    },
  },
}));

const CardWrapper = styled.div({
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 4,
  marginTop: 4,
  display: 'flex',
  flex: '1',
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
