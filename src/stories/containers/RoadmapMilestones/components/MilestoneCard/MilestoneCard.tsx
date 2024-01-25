import { styled } from '@mui/system';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MobileProgressBar from './MobileProgressBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const MilestoneCard: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Card isLight={isLight}>
      <TitleBox>
        <TitleContainer>
          <CodeBox>
            <MilestoneNumber>M1</MilestoneNumber>
            <Code isLight={isLight}>BASE</Code>
          </CodeBox>
          <NameBox>
            <Name isLight={isLight}>Exploration base</Name>
            <Quarter>Q4’23</Quarter>
          </NameBox>
        </TitleContainer>
      </TitleBox>
      <MobileOnlyBox>
        <DescriptionBox isLight={isLight}>
          <Description isLight={isLight}>
            A first deployment that integrates the different deliverables. Focus is on exploration of open design
            questions (removing uncertainty).
          </Description>
        </DescriptionBox>

        <MobileProgressBox>
          <ProgressContainer>
            <MobileProgressBar value={55} />
          </ProgressContainer>
          <ViewButton isLight={isLight} label="View" />
        </MobileProgressBox>
      </MobileOnlyBox>

      <TabletAndDesktopOnlyBox>
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

          <ViewButton isLight={isLight} label="View" />
        </BottomBox>
      </TabletAndDesktopOnlyBox>
    </Card>
  );
};

export default MilestoneCard;

const Card = styled('div')<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFF' : '#1E2C37',
  borderRadius: 6,
  boxShadow: isLight ? '0px 4px 6px 0px rgba(195, 195, 195, 0.25)' : '10px 15px 20px 6px rgba(20, 0, 141, 0.10)',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 14,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 15,
  },
}));

const TitleBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 0',
  width: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '0 0 8px',
  },
});

const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  justifyContent: 'space-between',
  width: '100%',
});

const CodeBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
});

const MilestoneNumber = styled('span')({
  color: '#B6BCC2',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontWeight: 600,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
  },
});

const Code = styled('span')<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const NameBox = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '0 4px',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  borderRadius: 4,
  background: theme.palette.mode === 'light' ? 'rgba(236, 239, 249, 0.50)' : '#1F2537',

  [lightTheme.breakpoints.up('tablet_768')]: {
    background: 'none',
    justifyContent: 'flex-end',
    padding: 0,
  },
}));

const Name = styled('span')<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Quarter = styled('span')(() => ({
  color: '#B6BCC2',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    fontWeight: 600,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const MobileOnlyBox = styled('div')({
  display: 'flex',
  alignSelf: 'stretch',
  gap: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const TabletAndDesktopOnlyBox = styled('div')({
  display: 'none',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    gap: 10,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
});

const MobileProgressBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minWidth: 114,
  padding: '8px 4px 0px 4px',
  gap: 8,
});

const ProgressContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const BottomBox = styled('div')({
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

const XBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

const ProgressBox = styled('div')({
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

const Label = styled('div')<WithIsLight>(({ isLight }) => ({
  color: '#708390',
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',

  [lightTheme.breakpoints.up('tablet_768')]: {
    color: isLight ? '#434358' : '#708390',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
  },
}));

const ViewButton = styled(CustomButton)<WithIsLight>(({ isLight }) => ({
  width: '100%',
  padding: '8px 23px',
  borderColor: isLight ? '#D4D9E1' : '#405361',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '2px 23px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '7px 23px',
  },
}));

const ProgressBarBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 8,

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
});

const ProgressBar = styled('div')<WithIsLight & { progress: number }>(({ isLight, progress }) => ({
  position: 'relative',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : '#10191F',
  boxShadow: isLight
    ? '2px 4px 7px 0px rgba(26, 171, 155, 0.11)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
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
    background: '#1AAB9B',
    height: '100%',
    width: `${progress * 100}%`,
  },
}));

const ProgressLabel = styled('span')<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
  },
}));

const DescriptionBox = styled('div')<WithIsLight>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
  padding: 8,
  borderRadius: 6,
  background: isLight ? 'rgba(246, 248, 249, 0.50)' : 'rgba(112, 129, 144, 0.20)',
  boxShadow: isLight ? '1px 3px 7px 0px rgba(0, 0, 0, 0.05) inset' : '1px 3px 7px 0px rgba(9, 35, 68, 0.40) inset',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    padding: 16,
  },
}));

const DescriptionTitle = styled('div')<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#434358' : '#D2D4EF',
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

const Description = styled('div')<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#546978' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',
  textAlign: 'left',
  maxWidth: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
    textAlign: 'center',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    overflow: 'visible',
    whiteSpace: 'normal',
    textOverflow: 'clip',
  },
}));
