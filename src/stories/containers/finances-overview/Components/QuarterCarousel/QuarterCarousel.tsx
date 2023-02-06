import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isQuarter1, isQuarter4 } from '../../utils/quarters';
import QuarterCard from '../QuarterCard/QuarterCard';
import useQuarterCarousel from './useQuarterCarousel';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';
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
            <CardWrapper addExtraMarginLeft={showDivider && isQuarter1(item.period)}>
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
    marginBottom: 24,
  },

  '& .swiper-slide': {
    display: 'flex',
  },
});

const CardWrapper = styled.div<{ addExtraMarginLeft: boolean }>(({ addExtraMarginLeft = false }) => ({
  marginLeft: addExtraMarginLeft ? 16 : 8,
  marginRight: 8,
  marginBottom: 40,
  width: '100%',
}));

const Divider = styled.div({
  width: 1,
  height: 108,
  background: '#D4D9E1',
  marginTop: 24,
  marginLeft: 8,

  [lightTheme.breakpoints.up('table_834')]: {
    height: 136,
  },
});
