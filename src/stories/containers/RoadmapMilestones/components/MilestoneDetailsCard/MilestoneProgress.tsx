import { styled } from '@mui/material';
import PercentageProgressBar from './PercentageProgressBar';

const MilestoneProgress: React.FC = () => (
  <OutlinedCard>
    <PercentageProgressBar value={75.0} />

    <TextProgressBox>
      <TextProgress>
        <span>55</span>/<span>74</span> Story Points Completed
      </TextProgress>

      <TextProgress>
        <span>1</span>/<span>6</span> Deliverables Completed
      </TextProgress>
    </TextProgressBox>
  </OutlinedCard>
);

export default MilestoneProgress;

const OutlinedCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  alignSelf: 'stretch',
  padding: '16px 0',
  borderRadius: 6,
  border: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : 'red'}`,

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 0,
    border: 'none',
  },
}));

const TextProgressBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
}));

const TextProgress = styled('span')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.mode === 'light' ? '#231536' : 'red',

  '& span:nth-child(1)': {
    color: theme.palette.mode === 'light' ? '#1AAB9B' : 'red',
  },

  '& span:nth-child(2)': {
    color: theme.palette.mode === 'light' ? '#708390' : 'red',
    fontWeight: 700,
  },
}));
