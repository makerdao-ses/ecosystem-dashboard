import { styled } from '@mui/material';
import GenericCommentCard from './GenericCommentCard';

const NoComments: React.FC = () => (
  <GenericCommentCard opacity={0.5}>
    <Title>No Data Provided</Title>
  </GenericCommentCard>
);

export default NoComments;

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '38px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  padding: '77px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '32px',
  },
}));
