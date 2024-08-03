import { styled } from '@mui/material';

import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';

import { siteRoutes } from '@/config/routes';

import type { Milestone } from '@/core/models/interfaces/roadmaps';

import useMilestoneCard from './useMilestoneCard';

import type { FC } from 'react';

interface MilestoneCardProps {
  slug: string;
  milestoneData: Milestone;
}

const MilestoneCard: FC<MilestoneCardProps> = ({ slug, milestoneData }) => {
  useMilestoneCard();

  return (
    <Container>
      <Header>
        <CodesContainer>
          <SequenceCode>{milestoneData.sequenceCode}</SequenceCode>
          <Code>{milestoneData.code}</Code>
        </CodesContainer>
        <StyledInternalLinkButton
          href={`${siteRoutes.roadmapMilestones(slug)}#${milestoneData.code}`}
          label="Details"
        />
      </Header>
      <TitleContainer>
        <Title>{milestoneData.title}</Title>
        <Abstract>{milestoneData.abstract}</Abstract>
      </TitleContainer>
    </Container>
  );
};

export default MilestoneCard;

const Container = styled(Card)(() => ({
  width: '100%',
  height: 400,
  padding: '0px 0px 8px 0px',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 8px 4px 8px',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const CodesContainer = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const SequenceCode = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const Code = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const StyledInternalLinkButton = styled(InternalLinkButton)(({ theme }) => ({
  padding: 0,

  '&:hover': {
    gap: 8,
    padding: 0,

    '& div:first-of-type': {
      color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
    },

    '& div:last-of-type > svg path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
    },
  },

  '&:active, &:focus': {
    borderColor: 'transparent',
  },

  '& div:first-of-type': {
    color: theme.palette.isLight ? theme.palette.colors.charcoal[800] : theme.palette.colors.charcoal[200],
  },

  '& div:last-of-type > svg path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[800] : theme.palette.colors.charcoal[200],
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 0',
  gap: 4,
  margin: '8px 8px 0px',
  padding: '4px 8px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const Title = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const Abstract = styled('p')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));
