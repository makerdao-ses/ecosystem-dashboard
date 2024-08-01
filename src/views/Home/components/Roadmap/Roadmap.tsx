import { styled } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';

import MilestoneCard from '@/views/Home/components/MilestoneCard/MilestoneCard';

import { roadmapsData } from '@/views/Home/staticData';
import useRoadmap from './useRoadmap';

import type { FC } from 'react';
import type { SwiperProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const Roadmap: FC = () => {
  const { tabs, activeRoadmapRef, swiperRef, activeTab, handleActiveTab } = useRoadmap(roadmapsData);
  const activeRoadmap = activeRoadmapRef.current;

  const swiperOptions: SwiperProps = {
    pagination: {
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 8,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 0,
      },
    },
  };

  return (
    <Container>
      <ShadowWrapper>
        <FancyTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab: string) => {
            handleActiveTab(tab);
          }}
        />
        <DescriptionContainer>
          <Description>{roadmapsData[activeRoadmap].description}</Description>
        </DescriptionContainer>
      </ShadowWrapper>
      <SwiperContainer>
        <Swiper ref={swiperRef} modules={[Pagination]} centerInsufficientSlides {...swiperOptions}>
          {roadmapsData[activeRoadmap].milestones.map((milestoneData, index) => (
            <SwiperSlide key={`${milestoneData.title}-${index}`}>
              <MilestoneCardContainer>
                <MilestoneCard {...milestoneData} />
              </MilestoneCardContainer>
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
    gap: 24,
  },
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '0px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const Description = styled('h3')(({ theme }) => ({
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
  margin: '0px -8px',

  '& .swiper-slide': {
    marginBottom: 8,
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

const MilestoneCardContainer = styled('div')(() => ({
  marginLeft: 8,
  marginRight: 8,
}));
