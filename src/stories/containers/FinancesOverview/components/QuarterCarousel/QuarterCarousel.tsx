import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isQuarter4 } from '../../utils/quarters';
import QuarterCard from '../QuarterCard/QuarterCard';
import useQuarterCarousel from './useQuarterCarousel';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import 'swiper/css';

type QuarterCarouselProps = {
  quarters: ExpenseDto[];
};

const QuarterCarousel: React.FC<QuarterCarouselProps> = ({ quarters }) => {
  const { showDivider, swiperOptions } = useQuarterCarousel(quarters);

  return (
    <SwiperWrapper>
      <Swiper {...swiperOptions}>
        {quarters.map((item, index) => (
          <SwiperSlide key={index}>
            <CardWrapper>
              <QuarterCard {...item} />
            </CardWrapper>
            {showDivider && isQuarter4(item.period) && index < quarters.length - 1 && <Divider />}
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
};

export default QuarterCarousel;

const SwiperWrapper = styled.div({
  margin: '0 -8px',

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 32,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 24,
  },

  '& .swiper-slide': {
    display: 'flex',
    maxWidth: '50%',

    [lightTheme.breakpoints.up('table_834')]: {
      maxWidth: '33.3333%',
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      maxWidth: '25%',
    },
  },
});

const CardWrapper = styled.div({
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 40,
  width: '100%',
});

const Divider = styled.div({
  width: 1,
  height: 131,
  background: '#D4D9E1',

  [lightTheme.breakpoints.up('table_834')]: {
    height: 161,
  },
});
