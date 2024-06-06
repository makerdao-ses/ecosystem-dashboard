import { styled } from '@mui/material';
import Ellipsis from 'public/assets/svg/ellipsis.svg';

const DotsSegment: React.FC = () => (
  <Icon>
    <Ellipsis />
  </Icon>
);

export default DotsSegment;

const Icon = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  padding: '0 4px',

  [theme.breakpoints.up('tablet_768')]: {
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : 'red',
  },
}));
