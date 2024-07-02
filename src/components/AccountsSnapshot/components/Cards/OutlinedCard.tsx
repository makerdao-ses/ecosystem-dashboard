import { styled } from '@mui/material';

interface OutlinedCardProps extends React.PropsWithChildren {
  className?: string;
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({ children, className }) => (
  <Card className={className}>{children}</Card>
);

export default OutlinedCard;

const Card = styled('div')(({ theme }) => ({
  width: '100%',
  background: theme.palette.isLight ? '#FFFFFF' : '#1E2C37',
  border: `1px solid ${theme.palette.isLight ? '#D1DEE6' : 'none'}`,
  borderRadius: 6,
  boxShadow: theme.palette.isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
}));
