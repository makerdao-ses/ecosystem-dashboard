import { styled } from '@mui/material';

interface SectionTitleCardProps {
  title: string;
  groupTitle?: string;
}

const SectionTitleCard: React.FC<SectionTitleCardProps> = ({ title, groupTitle }) => (
  <TitleCard>
    {groupTitle && <GroupTitle>{groupTitle}</GroupTitle>}
    <Title>{title}</Title>
  </TitleCard>
);

export default SectionTitleCard;

const TitleCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px',
  backgroundColor: theme.palette.isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(120, 122, 155, 0.3)',
  boxShadow: theme.palette.isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: 6,
  marginBottom: 8,
}));

const GroupTitle = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '15px',
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom: 16,
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '19px',
  letterSpacing: 0.4,
  fontWeight: 700,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));
