import { styled, useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import React, { useState } from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { siteRoutes } from '@/config/routes';
import type { Deliverable } from '@/core/models/interfaces/deliverables';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';
import DeliverablePercentageBar from '../DeliverablePercentageBar/DeliverablePercentageBar';
import DeliverableStatusChip from '../DeliverableStatusChip/DeliverableStatusChip';
import DeliverableStoryPointsBar from '../DeliverableStoryPointsBar/DeliverableStoryPointsBar';
import KeyResults from '../KeyResults/KeyResults';
import MilestoneLink from '../MilestoneLink/MilestoneLink';
import OwnerTooltipContent from '../OwnerTooltipContent/OwnerTooltipContent';
import ProjectLink from '../ProjectLink/ProjectLink';
import type { DeliverableViewMode } from '../ProjectCard/ProjectCard';
import type { Theme } from '@mui/material';

interface DeliverableCardProps {
  deliverable: Deliverable;
  viewMode: DeliverableViewMode;
  maxKeyResultsOnRow: number;
  isProjectCard?: boolean;
}

const DeliverableCard: React.FC<DeliverableCardProps> = ({
  deliverable,
  viewMode,
  maxKeyResultsOnRow,
  isProjectCard = true,
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleToggleExpand = () => setExpanded((prev) => !prev);

  return (
    <Card fitContent={!isMobile && viewMode === 'compacted' && !expanded}>
      <HeaderContainer>
        <TitleContainer>
          <Title viewMode={viewMode}>{deliverable.title}</Title>
        </TitleContainer>
        <DeliverableOwnerContainer>
          <SESTooltip content={<OwnerTooltipContent title="Deliverable Owner" items={[deliverable.owner]} />}>
            <Link href={siteRoutes.ecosystemActorAbout(deliverable.owner.code)}>
              <OwnerImage src={deliverable.owner.imageUrl} alt={deliverable.owner.name} />
            </Link>
          </SESTooltip>
        </DeliverableOwnerContainer>
      </HeaderContainer>
      <ProgressContainer>
        <DeliverableStatusChip status={deliverable.status} />
        {deliverable.status === DeliverableStatus.IN_PROGRESS &&
          deliverable.workProgress &&
          (deliverable.workProgress.__typename === 'Percentage' ? (
            <DeliverablePercentageBar percentage={deliverable.workProgress.value} />
          ) : (
            <DeliverableStoryPointsBar
              total={deliverable.workProgress.total}
              completed={deliverable.workProgress.completed}
            />
          ))}
      </ProgressContainer>

      {(viewMode === 'detailed' || expanded) && (
        <Description>
          {deliverable.description.split('\n').map((paragraph) => (
            <p>{paragraph}</p>
          ))}
        </Description>
      )}
      <KeyBox>
        {isProjectCard ? (
          <MilestoneLink />
        ) : (
          deliverable.budgetAnchor.project &&
          deliverable.budgetAnchor.project.code &&
          deliverable.budgetAnchor.project.title && (
            <ProjectLink code={deliverable.budgetAnchor.project.code} name={deliverable.budgetAnchor.project.title} />
          )
        )}
        <KeyResults
          keyResults={deliverable.keyResults}
          viewMode={viewMode}
          expanded={expanded}
          handleToggleExpand={handleToggleExpand}
          maxKeyResultsOnRow={maxKeyResultsOnRow}
        />
      </KeyBox>
    </Card>
  );
};

export default DeliverableCard;

const Card = styled('div')<{ fitContent: boolean }>(({ theme, fitContent }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 7,
  borderRadius: 6,
  background: theme.palette.isLight ? '#fff' : '#1E2C37',
  border: `1px solid ${theme.palette.isLight ? '#D1DEE6' : '#31424E'}`,
  boxShadow: theme.palette.isLight
    ? '0px 3px 10px 0px rgba(88, 88, 88, 0.2)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.10)',
  padding: 15,
  height: fitContent ? 'fit-content' : 'auto',
}));

const HeaderContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  alignSelf: 'stretch',
});

const TitleContainer = styled('div')({
  maxWidth: 'calc(100% - 51px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: '1 0 0',
  marginBottom: 8,
});

const Title = styled('div')<{ viewMode: DeliverableViewMode }>(({ theme, viewMode }) => ({
  ...(viewMode !== 'detailed' && {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  alignSelf: 'stretch',
  color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
}));

const DeliverableOwnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const OwnerImage = styled(Avatar)({
  width: 28,
  height: 28,
  borderRadius: 20,
  border: '2px solid #fff',
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
});

const ProgressContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 16,
});

const Description = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  '& p': {
    margin: 0,
  },

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));

const KeyBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: 9,
  marginTop: 'auto',
});
