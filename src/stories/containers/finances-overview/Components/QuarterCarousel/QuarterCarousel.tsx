import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import QuarterCard from '../QuarterCard/QuarterCard';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';
import 'swiper/css';

type QuarterCarouselProps = {
  quarters: ExpenseDto[];
};

const QuarterCarousel: React.FC<QuarterCarouselProps> = ({ quarters }) => (
  <SwiperWrapper>
    <Swiper
      spaceBetween={0}
      slidesPerView={2}
      breakpoints={{
        834: {
          slidesPerView: 3,
        },
        1194: {
          slidesPerView: 4,
        },
      }}
    >
      {quarters.map((item, index) => (
        <SwiperSlide key={index}>
          <CardWrapper>
            <QuarterCard {...item} />
          </CardWrapper>
        </SwiperSlide>
      ))}
    </Swiper>
  </SwiperWrapper>
);

export default QuarterCarousel;

const SwiperWrapper = styled.div({
  margin: '0 -8px',

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 24,
  },
});

const CardWrapper = styled.div({
  padding: '0 8px',
  marginBottom: 40,
});
