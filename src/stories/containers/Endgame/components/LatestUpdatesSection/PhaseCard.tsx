import { styled } from '@mui/material';

const PhaseCard: React.FC = () => <Card>Phase X</Card>;

export default PhaseCard;

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  background: theme.palette.mode === 'light' ? 'white' : 'red',
  padding: 8,
  borderRadius: 6,
  boxShadow:
    theme.palette.mode === 'light'
      ? '20px 20px 20px rgba(219, 227, 237, 0.4), 1px 1px 5px rgba(190, 190, 190, 0.25)'
      : '20px 20px 20px red',
}));
