import { styled, useMediaQuery } from '@mui/material';
import { Fragment } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';

import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import MilestoneCard from '@/views/Home/components/MilestoneCard/MilestoneCard';

import useRoadmapSection from './useRoadmapSection';

import type { Theme } from '@mui/material';
import type { FC } from 'react';
import type { SwiperProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface RoadmapSectionProps {
  roadmaps: Roadmap[];
}

const RoadmapSection: FC<RoadmapSectionProps> = ({ roadmaps }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const { tabs, activeRoadmapRef, swiperRef, activeTab, handleActiveTab, coordinatorsRef } =
    useRoadmapSection(roadmaps);
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
          <Description>{roadmaps[activeRoadmap]?.description}</Description>
        </DescriptionContainer>
      </ShadowWrapper>
      {isMobile ? (
        <MobileMilestoneCardsContainer>
          {roadmaps[activeRoadmap]?.milestones.map((milestoneData, index) => (
            <Fragment key={milestoneData.id}>
              <MilestoneCard
                slug={roadmaps[activeRoadmap]?.slug}
                milestoneData={milestoneData}
                coordinatorsRef={coordinatorsRef}
              />
              {index !== roadmaps[activeRoadmap]?.milestones.length - 1 && <MobileMilestoneCardsDivider />}
            </Fragment>
          ))}
        </MobileMilestoneCardsContainer>
      ) : (
        <SwiperContainer>
          <Swiper ref={swiperRef} modules={[Pagination]} centerInsufficientSlides {...swiperOptions}>
            {roadmaps[activeRoadmap]?.milestones.map((milestoneData) => (
              <SwiperSlide key={milestoneData.id}>
                <MilestoneCardContainer>
                  <MilestoneCard
                    slug={roadmaps[activeRoadmap]?.slug}
                    milestoneData={milestoneData}
                    coordinatorsRef={coordinatorsRef}
                  />
                </MilestoneCardContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      )}
    </Container>
  );
};

export default RoadmapSection;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },
}));

const MobileMilestoneCardsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const MobileMilestoneCardsDivider = styled('div')(({ theme }) => ({
  width: 5,
  height: 24,
  borderRadius: '0px 0px 0px 0px',
  backgroundColor: theme.palette.colors.slate[100],
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  padding: '9px 16px',
  borderRadius: '0px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px',
  },
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
    height: 'auto',
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

    '&:not(.swiper-pagination-bullet-active):hover': {
      backgroundColor: theme.palette.isLight
        ? `${theme.palette.colors.charcoal[100]} !important`
        : `${theme.palette.colors.gray[800]} !important`,
    },
  },

  '& .swiper-pagination-bullet-active': {
    backgroundColor: theme.palette.isLight
      ? `${theme.palette.colors.gray[900]} !important`
      : `${theme.palette.colors.slate[50]} !important`,
  },
}));

const MilestoneCardContainer = styled('div')(() => ({
  height: '100%',
  marginLeft: 8,
  marginRight: 8,
}));
