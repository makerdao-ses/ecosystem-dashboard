import { CircularProgress, circularProgressClasses, styled } from '@mui/material';

interface PercentageProgressBarProps {
  value: number;
}

const PercentageProgressBar: React.FC<PercentageProgressBarProps> = ({ value }) => (
  <BarContainer>
    <CircularBarBase variant="determinate" size={103} thickness={7} value={100} />
    <CircularBarProgress variant="determinate" dir="rtl" size={103} thickness={7} value={value} />
    <LabelContainer>{Math.round(value)}%</LabelContainer>
  </BarContainer>
);

export default PercentageProgressBar;

const BarContainer = styled('div')(() => ({
  position: 'relative',
  display: 'inline-flex',
}));

const CircularBarBase = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#ECF1F3' : 'red',
}));

const CircularBarProgress = styled(CircularProgress)(() => ({
  animationDuration: '550ms',
  position: 'absolute',
  left: 0,

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
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
  fontWeight: 700,
}));
