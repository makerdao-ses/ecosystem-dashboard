import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Information from '@/components/icons/information';
import SESTooltip from '../SESTooltip/SESTooltip';

interface SectionTitleProps {
  title: string;
  tooltip: string | React.ReactElement;
  className?: string;
}

const TitleWithIconInformation: React.FC<SectionTitleProps> = ({ title, tooltip, className }) => (
  <Container className={className}>
    <Title>{title}</Title>
    <Tooltip>
      <SESTooltip content={tooltip} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000} showAsModal>
        <IconWrapper>
          <Information height={15} width={15} />
        </IconWrapper>
      </SESTooltip>
    </Tooltip>
  </Container>
);

export default TitleWithIconInformation;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 6,
  },
});

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '24px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '22px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const Tooltip = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  width: 24,
  height: 24,
  alignItems: 'center',
  cursor: 'pointer',
  '& svg': {
    path: {
      fill: theme.palette.colors.slate[100],
    },
  },
  ':hover': {
    path: {
      fill: theme.palette.colors.slate[200],
    },
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    '& svg': {
      width: 16,
      height: 16,
    },
  },
}));
