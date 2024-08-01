import { styled } from '@mui/material';

import Card from '@/components/Card/Card';

import type { Milestone } from '@/core/models/interfaces/roadmaps';

import useMilestoneCard from './useMilestoneCard';

import type { FC } from 'react';

const MilestoneCard: FC<Milestone> = ({ title }) => {
  useMilestoneCard();

  return <Container>{title}</Container>;
};

export default MilestoneCard;

const Container = styled(Card)(() => ({
  height: 400,
  padding: '0px 0px 8px 0px',
}));
