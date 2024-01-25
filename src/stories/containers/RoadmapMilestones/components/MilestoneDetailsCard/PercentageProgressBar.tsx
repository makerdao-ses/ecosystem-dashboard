import { CircularProgress, circularProgressClasses, styled, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

interface PercentageProgressBarProps {
  value: number;
}

const PercentageProgressBar: React.FC<PercentageProgressBarProps> = ({ value }) => {
  const isUp1024 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));

  return (
    <BarContainer>
      <CircularBarBase variant="determinate" size={isUp1024 ? 160 : 103} thickness={isUp1024 ? 11 : 7} value={100} />
      <CircularBarProgress
        variant="determinate"
        dir="rtl"
        size={isUp1024 ? 160 : 103}
        thickness={isUp1024 ? 11 : 7}
        value={value}
      />
      <LabelContainer>{Math.round(value)}%</LabelContainer>
    </BarContainer>
  );
};

export default PercentageProgressBar;

const BarContainer = styled('div')(() => ({
  position: 'relative',
  display: 'inline-flex',
}));

const CircularBarBase = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E',
}));

const CircularBarProgress = styled(CircularProgress)(() => ({
  animationDuration: '550ms',
  position: 'absolute',
  left: 0,
  color: '#1AAB9B',

  [`& .${circularProgressClasses.circle}`]: {
    strokeLinecap: 'round',
  },
}));

const LabelContainer = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  fontWeight: 700,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 17.8,
    letterSpacing: 0.4,
  },
}));
