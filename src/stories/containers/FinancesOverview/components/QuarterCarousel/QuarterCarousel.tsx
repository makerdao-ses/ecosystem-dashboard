import styled from '@emotion/styled';
import ArrowSwiperNext from '@ses/components/svg/ArrowSwiperNext';
import ArrowSwiperPrevious from '@ses/components/svg/ArrowSwiperPrevious';
import lightTheme from '@ses/styles/theme/themes';
import React, { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { isQuarter4 } from '../../utils/quarters';
import QuarterCard from '../QuarterCard/QuarterCard';
import useQuarterCarousel from './useQuarterCarousel';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { SwiperRef } from 'swiper/react';

type QuarterCarouselProps = {
  quarters: ExpenseDto[];
};

const QuarterCarousel: React.FC<QuarterCarouselProps> = ({ quarters }) => {
  const swiper = useSwiper();
  const { showDivider, swiperOptions, isLight } = useQuarterCarousel(quarters);
  const ref = useRef<SwiperRef>(null);
  // Add a state that will trigger a re-render later as ref.current is null on first render
  // ref changes don't trigger a re-render
  const [, setInit] = useState(false);
  const navigationPrevRef = useRef<SVGSVGElement>(null);
  const navigationNextRef = useRef<SVGSVGElement>(null);
  const [isBegin, setIsBegin] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const handleOnNext = () => {
    swiper?.slideNext();
  };

  const handleOnPrevious = () => {
    swiper?.slidePrev();
  };

  const onSlideChange = () => {
    setIsBegin(ref.current?.swiper?.isBeginning || false);
    setIsEnd(ref.current?.swiper?.isEnd || false);
  };

  return (
    <SwiperWrapper>
      <WrapperMobile>
        <ContainerButtonLeft>
          <ArrowSwiperPrevious onClick={handleOnPrevious} navigationPrevRef={navigationPrevRef} isDisable={isBegin} />
        </ContainerButtonLeft>
        <ContainerButtonRight>
          <ArrowSwiperNext onClick={handleOnNext} navigationNextRef={navigationNextRef} isDisable={isEnd} />
        </ContainerButtonRight>
      </WrapperMobile>
      <Swiper
        onSlideChange={onSlideChange}
        ref={ref}
        {...swiperOptions}
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current as HTMLElement | null,
          nextEl: navigationNextRef.current as HTMLElement | null,
        }}
        onInit={() => setInit(true)}
      >
        {quarters.map((item, index) => (
          <SwiperSlide key={index}>
            <CardWrapper>
              <QuarterCard {...item} />
            </CardWrapper>
            {showDivider && isQuarter4(item.period) && index < quarters.length - 1 && <Divider isLight={isLight} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
};

export default QuarterCarousel;

const SwiperWrapper = styled.div({
  margin: '0 -8px',
  position: 'relative',

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 32,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 24,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    margin: '0 -12px',
  },

  '& .swiper-slide': {
    display: 'flex',
    maxWidth: '50%',

    [lightTheme.breakpoints.up('tablet_768')]: {
      maxWidth: '33.3333%',
    },

    [lightTheme.breakpoints.up('desktop_1024')]: {
      maxWidth: '25%',
    },
  },

  '& .swiper-button-prev:after': {
    display: 'none',
  },
});

const CardWrapper = styled.div({
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 40,
  width: '100%',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: 12,
    marginRight: 12,
  },
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  width: 1,
  height: 131,
  background: isLight ? '#D4D9E1' : '#30363C',

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 161,
  },
}));

const ContainerButtonRight = styled.div({
  marginRight: -15,
  position: 'absolute',
  top: '35%',
  right: 0,
  zIndex: 3,
});

const ContainerButtonLeft = styled.div({
  marginLeft: -15,
  position: 'absolute',
  top: '35%',
  zIndex: 3,
});

const WrapperMobile = styled.div({
  display: 'none',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'block',
  },
});
