import { styled } from '@mui/material';
import AngleLeft from 'public/assets/svg/angle_left.svg';

export interface PagerArrowsProps {
  className?: string;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const PagerArrows: React.FC<PagerArrowsProps> = ({ className, hasPrevious, hasNext, onPrevious, onNext }) => (
  <Container className={className}>
    <Angle onClick={onPrevious} disabled={!hasPrevious} />
    <AngleRight onClick={onNext} disabled={!hasNext} />
  </Container>
);

export default PagerArrows;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 4,
  },
}));

const Angle = styled(AngleLeft)(({ theme }) => ({
  cursor: 'pointer',
  width: 16,
  height: 16,

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
  },

  '&:hover path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[500] : theme.palette.colors.gray[50],
  },

  '&[disabled]': {
    cursor: 'default',

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
    },
  },
}));

const AngleRight = styled(Angle)(() => ({
  transform: 'rotate(180deg)',
}));
