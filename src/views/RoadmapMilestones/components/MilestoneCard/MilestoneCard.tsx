import { styled } from '@mui/material';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useRouter } from 'next/router';
import React from 'react';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { formatDateStringToQuarter } from '../../utils';
import MobileProgressBar from './MobileProgressBar';

interface MilestoneCardProps {
  milestone: Milestone;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  const router = useRouter();
  const handleView = () => router.replace(`#${milestone.code}`);

  return (
    <Card>
      <TitleBox>
        <TitleContainer>
          <NameBox>
            <MilestoneNumber>{milestone.sequenceCode}</MilestoneNumber>
            <Code>{milestone.code}</Code>
            <Name>{milestone.title}</Name>
          </NameBox>
          <QuarterBox>
            <Quarter>
              {/* target date should be printed out with the format: Q4’23 */}
              {/* {`${milestone.targetDate.split('-')[1]}'${milestone.targetDate.split('-')[0].slice(-2)}`} */}
              {formatDateStringToQuarter(milestone.targetDate)}
            </Quarter>
          </QuarterBox>
        </TitleContainer>
      </TitleBox>
      <MobileOnlyBox>
        <DescriptionBox>
          <Description>{milestone.abstract}</Description>
        </DescriptionBox>

        <MobileProgressBox>
          <ProgressContainer>
            <MobileProgressBar value={55} />
          </ProgressContainer>
          <ViewButton label="View" onClick={handleView} />
        </MobileProgressBox>
      </MobileOnlyBox>

      <TabletAndDesktopOnlyBox>
        <DescriptionBox>
          <DescriptionTitle>{milestone.title}</DescriptionTitle>
          <Description>{milestone.abstract}</Description>
        </DescriptionBox>
        <BottomBox>
          <XBox>
            <ProgressBox>
              <Label>Progress</Label>

              <ProgressBarBox>
                <ProgressBar progress={0.75} />
                <ProgressLabel>75%</ProgressLabel>
              </ProgressBarBox>
            </ProgressBox>
          </XBox>

          <ViewButton label="View" onClick={handleView} />
        </BottomBox>
      </TabletAndDesktopOnlyBox>
    </Card>
  );
};

export default MilestoneCard;

const Card = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? '#FFF' : '#1E2C37',
  borderRadius: 6,
  boxShadow: theme.palette.isLight
    ? '0px 4px 6px 0px rgba(195, 195, 195, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.10)',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
    height: '100%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 14,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 15,
  },
}));

const TitleBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 0',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '0 0 8px',
  },
}));

const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  justifyContent: 'space-between',
  width: '100%',
});

const NameBox = styled('div')(() => ({
  display: 'block',
}));

const MilestoneNumber = styled('span')(({ theme }) => ({
  color: '#B6BCC2',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 600,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
  },
}));

const Code = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',
  marginLeft: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const QuarterBox = styled('div')(({ theme }) => ({
  padding: '0 4px',
  alignSelf: 'baseline',
  borderRadius: 4,
  background: theme.palette.isLight ? 'rgba(236, 239, 249, 0.50)' : '#1F2537',

  [theme.breakpoints.up('tablet_768')]: {
    background: 'none',
    justifyContent: 'flex-end',
    padding: 0,
  },
}));

const Name = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 'normal',
  marginLeft: 8,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Quarter = styled('span')(({ theme }) => ({
  color: '#B6BCC2',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    fontWeight: 600,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const MobileOnlyBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'stretch',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const TabletAndDesktopOnlyBox = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    gap: 10,
    height: '100%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

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

const BottomBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 12,
    marginTop: 'auto',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },
}));

const XBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

const ProgressBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 3,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 3,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 8,
  },
}));

const Label = styled('div')(({ theme }) => ({
  color: '#708390',
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',

  [theme.breakpoints.up('tablet_768')]: {
    color: theme.palette.isLight ? '#434358' : '#708390',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
  },
}));

const ViewButton = styled(CustomButton)(({ theme }) => ({
  width: '100%',
  padding: '8px 23px',
  borderColor: theme.palette.isLight ? '#D4D9E1' : '#405361',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 23px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '7px 23px',
  },
}));

const ProgressBarBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 8,

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));

const ProgressBar = styled('div')<{ progress: number }>(({ theme, progress }) => ({
  position: 'relative',
  borderRadius: 6,
  background: theme.palette.isLight ? '#ECF1F3' : '#10191F',
  boxShadow: theme.palette.isLight
    ? '2px 4px 7px 0px rgba(26, 171, 155, 0.11)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  height: 12,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    height: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
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

const ProgressLabel = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  lineHeight: 'normal',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
  },
}));

const DescriptionBox = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
  padding: 8,
  borderRadius: 6,
  background: theme.palette.isLight ? 'rgba(246, 248, 249, 0.50)' : 'rgba(112, 129, 144, 0.20)',
  boxShadow: theme.palette.isLight
    ? '1px 3px 7px 0px rgba(0, 0, 0, 0.05) inset'
    : '1px 3px 7px 0px rgba(9, 35, 68, 0.40) inset',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    padding: 16,
    height: '100%',
  },
}));

const DescriptionTitle = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#434358' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',
  textAlign: 'center',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
    padding: '0 2px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#546978' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',
  textAlign: 'left',
  maxWidth: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
    textAlign: 'center',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    overflow: 'visible',
    whiteSpace: 'normal',
    textOverflow: 'clip',
  },
}));
