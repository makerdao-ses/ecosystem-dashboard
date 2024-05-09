import { styled } from '@mui/material';

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
  background: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderRadius: 12,
}));
