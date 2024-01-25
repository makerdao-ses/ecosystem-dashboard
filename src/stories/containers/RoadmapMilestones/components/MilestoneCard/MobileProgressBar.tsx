import { CircularProgress, circularProgressClasses, styled } from '@mui/material';

interface MobileProgressBarProps {
  value: number;
}

const MobileProgressBar: React.FC<MobileProgressBarProps> = ({ value }) => (
  <BarContainer>
    <CircularBarBase variant="determinate" size={56} thickness={6} value={100} />
    <CircularBarProgress variant="determinate" dir="rtl" size={56} thickness={6} value={value} />
    <LabelContainer>{Math.round(value)}%</LabelContainer>
  </BarContainer>
);

export default MobileProgressBar;

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
  color: theme.palette.mode === 'light' ? '#405361' : '#D2D4EF',
  fontWeight: 700,
  fontSize: 12,
}));
