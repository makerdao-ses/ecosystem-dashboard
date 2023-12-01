import styled from '@emotion/styled';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const MilestoneCard: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Card isLight={isLight}>
      <TitleBox>
        <TitleContainer>
          <MilestoneNumber isLight={isLight}>M1</MilestoneNumber>
          <Code isLight={isLight}>BASE</Code>
          <Title isLight={isLight}>Exploration base</Title>
        </TitleContainer>
        <Quarter isLight={isLight}>Q4’23</Quarter>
      </TitleBox>
      <DescriptionBox isLight={isLight}>
        <DescriptionTitle isLight={isLight}>Exploration Base</DescriptionTitle>
        <Description isLight={isLight}>
          A first deployment that integrates the different deliverables. Focus is on exploration of open design
          questions (removing uncertainty).
        </Description>
      </DescriptionBox>
      <BottomBox>
        <XBox>
          <ProgressBox>
            <Label isLight={isLight}>Progress</Label>

            <ProgressBarBox>
              <ProgressBar isLight={isLight} progress={0.75} />
              <ProgressLabel isLight={isLight}>75%</ProgressLabel>
            </ProgressBarBox>
          </ProgressBox>
        </XBox>

        <ViewButton label="View" />
      </BottomBox>
    </Card>
  );
};

export default MilestoneCard;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFF' : 'red',
  borderRadius: 6,
  boxShadow: isLight ? '0px 4px 6px 0px rgba(195, 195, 195, 0.25)' : '0px 4px 6px 0px red',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: 8,
    gap: 8,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 14,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 15,
  },
}));

const TitleBox = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  alignSelf: 'stretch',

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingBottom: 8,
  },
});

const TitleContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 12,
  },
});

const MilestoneNumber = styled.span<WithIsLight>(({ isLight }) => ({
  display: 'none',
  color: isLight ? '#708390' : 'red',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'inline',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
  },
}));

const Code = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const Title = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#25273D' : 'red',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Quarter = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#708390' : 'red',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const BottomBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 12,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },
});

const XBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

const ProgressBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 3,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 3,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 8,
  },
});

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#708390' : 'red',
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',

  [lightTheme.breakpoints.up('tablet_768')]: {
    color: isLight ? '#434358' : 'red',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
  },
}));

const ViewButton = styled(CustomButton)({
  width: '100%',
  padding: '8px 23px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '2px 23px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '7px 23px',
  },
});

const ProgressBarBox = styled.div({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 8,

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
});

const ProgressBar = styled.div<WithIsLight & { progress: number }>(({ isLight, progress }) => ({
  position: 'relative',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : 'red',
  boxShadow: isLight ? '2px 4px 7px 0px rgba(26, 171, 155, 0.11)' : '2px 4px 7px 0px red',
  height: 12,
  width: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 8,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    height: 24,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    borderRadius: 6,
    background: isLight ? '#1AAB9B' : 'red',
    height: '100%',
    width: `${progress * 100}%`,
  },
}));

const ProgressLabel = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 12,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
  },
}));

const DescriptionBox = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
  padding: 16,
  borderRadius: 6,
  background: isLight ? 'rgba(246, 248, 249, 0.50)' : '1px 3px 7px 0px rgba(0, 0, 0, 0.05) inset',
  boxShadow: isLight ? '1px 3px 7px 0px rgba(0, 0, 0, 0.05) inset' : '1px 3px 7px 0px red inset',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
}));

const DescriptionTitle = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#434358' : 'red',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',
  textAlign: 'center',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
    padding: '0 2px',
  },
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  color: isLight ? '#546978' : 'red',
  fontSize: 14,
  lineHeight: 'normal',
  textAlign: 'center',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'block',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    overflow: 'visible',
    whiteSpace: 'normal',
    textOverflow: 'clip',
  },
}));
