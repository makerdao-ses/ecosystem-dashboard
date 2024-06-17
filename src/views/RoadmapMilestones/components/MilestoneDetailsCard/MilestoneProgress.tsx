import { styled } from '@mui/material';
import PercentageProgressBar from './PercentageProgressBar';

const FEATURE_ENABLED = false;

const MilestoneProgress: React.FC = () => (
  <OutlinedCard>
    <PercentageProgressBar value={75.0} />

    <TextProgressBox>
      {FEATURE_ENABLED && (
        <TextProgress>
          <span>55</span>/<span>74</span> Story Points Completed
        </TextProgress>
      )}

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
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#31424E'}`,

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 0,
    border: 'none',
  },
}));

const TextProgressBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 12,
  },
}));

const TextProgress = styled('span')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  '& span:nth-child(1)': {
    color: '#1AAB9B',
  },

  '& span:nth-child(2)': {
    color: theme.palette.isLight ? '#708390' : '#B6BCC2',
    fontWeight: 700,
  },
}));
