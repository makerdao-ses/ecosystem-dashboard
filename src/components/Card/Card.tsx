import { styled } from '@mui/material';
import shadows from '@ses/styles/theme/shadows';

interface CardProps extends React.PropsWithChildren {
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className }) => (
  <CardComponent className={className}>{children}</CardComponent>
);

export default Card;

const CardComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.isLight ? 'white' : 'red',
  boxShadow: theme.palette.isLight ? shadows.modules : shadows.darkMode,
  borderRadius: 12,
}));
