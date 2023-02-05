import styled from '@emotion/styled';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import QuarterCard from '../QuarterCard/QuarterCard';

import 'swiper/css';

const QuarterCarousel: React.FC = () => {
  const items = [
    {
      period: '2021-Q4',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      budgetCap: 15132650.0,
    },
    {
      period: '2022-Q1',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      budgetCap: 15132650.0,
    },
    {
      period: '2022-Q2',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      budgetCap: 15132650.0,
    },
    {
      period: '2022-Q3',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      budgetCap: 15132650.0,
    },
    {
      period: '2022-Q4',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      budgetCap: 15132650.0,
    },
    {
      period: '2023-Q1',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 0.0,
      budgetCap: 15132650.0,
    },
  ];

  return (
    <SwiperWrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={2}
        breakpoints={{
          834: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1194: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <CardWrapper>
              <QuarterCard {...item} />
            </CardWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
};

export default QuarterCarousel;

const SwiperWrapper = styled.div({
  margin: '0 -8px',
});

const CardWrapper = styled.div({
  padding: '0 8px 40px',
});
