import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MilestoneCard from '../MilestoneCard/MilestoneCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const RoadmapTimeline = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const viewAll = false;
  const milestones = Array.from({ length: 8 });

  const up = milestones.length <= 4 ? milestones : milestones.filter((_, i) => i % 2 === 0);
  const down = milestones.filter((_, i) => i % 2 !== 0);

  const shouldAddPadding = milestones.length % 2 === 0 && milestones.length > 4;

  return (
    <div>
      {isMobile ? (
        <MobileTimeline>
          <MilestoneCard />
          <MilestoneCard />
          <MilestoneCard />
          <MilestoneCard />
          <MilestoneCard />

          <ButtonBox>
            <Button isLight={isLight}>
              <span>View all Roadmap</span>
              <svg
                style={{ transform: `rotate(${viewAll ? '180' : 0}deg)` }}
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.19339 10.8631C8.35404 11.0456 8.64598 11.0456 8.80664 10.8631L13.4036 5.63952C13.6255 5.38735 13.4398 5 13.097 5H3.90306C3.56023 5 3.37451 5.38735 3.59643 5.63952L8.19339 10.8631Z"
                  fill={isLight ? '#25273D' : '#B7A6CD'}
                />
              </svg>
            </Button>
          </ButtonBox>
        </MobileTimeline>
      ) : (
        <DesktopTimeline>
          <Up shouldAddPadding={shouldAddPadding} isLight={isLight}>
            {up.map((_, i) => (
              <CardWrapper key={i} isLight={isLight}>
                <MilestoneCard />
              </CardWrapper>
            ))}
          </Up>
          {milestones.length > 4 && (
            <Down shouldAddPadding={shouldAddPadding} isLight={isLight}>
              {down.map((_, i) => (
                <CardWrapper key={i} isLight={isLight}>
                  <MilestoneCard />
                </CardWrapper>
              ))}
            </Down>
          )}
        </DesktopTimeline>
      )}
    </div>
  );
};

export default RoadmapTimeline;

const MobileTimeline = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  position: 'relative',
  zIndex: 1,

  '&:before': {
    zIndex: -1,
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 5,
    height: '100%',
    background: '#6EDBD0',
  },
}));

const ButtonBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const Button = styled.button<WithIsLight>(({ isLight }) => ({
  marginTop: 'auto',
  padding: '10px 15px 10px 24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  alignSelf: 'stretch',
  borderRadius: 22,
  border: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}`,
  background: isLight ? '#fff' : '#1E2C37',
  cursor: 'pointer',

  '& > span': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: 0.4,
    color: isLight ? '#31424E' : '#9FAFB9',
  },

  '&:hover': {
    border: `1px solid ${isLight ? '#25273D' : '#D2D4EF'}`,

    '& > span': {
      color: isLight ? '#231536' : '#D2D4EF',
    },
  },
}));

const DesktopTimeline = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Up = styled.div<WithIsLight & { shouldAddPadding: boolean }>(({ isLight, shouldAddPadding }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  borderBottom: `2.5px solid ${isLight ? '#B6EDE7' : '#06554C'}`,
  ...(shouldAddPadding && { paddingRight: 'calc(12.5% - 12px)' }),

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 56,
  },

  '& > div': {
    paddingBottom: 32,

    '&:before': {
      bottom: 0,
    },

    '&:after': {
      bottom: -8,
    },
  },
}));

const Down = styled.div<WithIsLight & { shouldAddPadding: boolean }>(({ isLight, shouldAddPadding }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  borderTop: `2.5px solid ${isLight ? '#B6EDE7' : '#06554C'}`,
  ...(shouldAddPadding && { paddingLeft: 'calc(12.5% - 12px)' }),

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 56,
  },

  '& > div': {
    paddingTop: 32,

    '&:before': {
      // line
      top: -0,
    },

    '&:after': {
      // circle
      top: -8,
    },
  },
}));

const CardWrapper = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: 'calc(25% - 12px)',

  [lightTheme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    width: 'calc(24.35% - 12px)',
  },

  '&:before': {
    // line
    zIndex: 0,
    content: '""',
    position: 'absolute',
    left: 'calc(50% - 1px)',
    width: 2,
    height: 32,
    background: isLight ? '#1AAB9B' : '#06554C',
  },

  '&:after': {
    // circle
    content: '""',
    position: 'absolute',
    left: 'calc(50% - 6px)',
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: `2px solid ${isLight ? '#1AAB9B' : '#06554C'}`,
    background: isLight ? '#fff' : '#10191F',
  },
}));
