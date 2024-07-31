import { styled } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import MilestoneCard from '@/views/Home/components/MilestoneCard/MilestoneCard';

import { roadmapData } from '@/views/Home/staticData';
import useRoadmap from './useRoadmap';

import type { FC } from 'react';
import type { SwiperProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const Roadmap: FC = () => {
  useRoadmap();

  const swiperOptions: SwiperProps = {
    pagination: {
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 16,
      },
    },
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{roadmapData.title}</Title>
      </TitleContainer>
      <SwiperContainer>
        <Swiper modules={[Pagination]} pagination={true} {...swiperOptions}>
          {roadmapData.cards.map((card, index) => (
            <SwiperSlide key={`${card.name}-${index}`}>
              {card.name}
              <MilestoneCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};

export default Roadmap;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '0px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const Title = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const SwiperContainer = styled('div')(({ theme }) => ({
  position: 'relative',

  '& .swiper-slide-active': {
    marginLeft: 0,
  },

  '& .swiper-pagination-horizontal': {
    position: 'relative',
    marginTop: 24,
  },

  '& .swiper-pagination-bullet': {
    width: 16,
    height: 16,
    backgroundColor: theme.palette.isLight
      ? `${theme.palette.colors.slate[50]} !important`
      : `${theme.palette.colors.gray[900]} !important`,
    opacity: '1 !important',

    '&:first-of-type': {
      borderRadius: '20px 0px 0px 20px',
    },

    '&:last-of-type': {
      borderRadius: '0px 20px 20px 0px',
    },
  },

  '& .swiper-pagination-bullet-active': {
    backgroundColor: theme.palette.isLight
      ? `${theme.palette.colors.gray[900]} !important`
      : `${theme.palette.colors.slate[50]} !important`,
  },
}));
