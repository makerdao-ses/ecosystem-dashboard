import { styled } from '@mui/material';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children, className, ...htmlAttrs }) => (
  <CardComponent className={className} {...htmlAttrs}>
    {children}
  </CardComponent>
);

export default Card;

const CardComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderRadius: 12,
}));
