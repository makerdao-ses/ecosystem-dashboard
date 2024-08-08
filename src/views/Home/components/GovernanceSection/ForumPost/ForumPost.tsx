import { styled } from '@mui/material';
import BulletIcon from '@/components/FancyTabs/BulletIcon';

const ForumPost: React.FC = () => {
  console.log('');

  return (
    <PostCard>
      <DescriptionContainer>
        <Title>Spell Crafting Q&A | Tuesday, January 30 at 4:30pm UTC</Title>
        <Tags>
          <Tag>
            <BulletIcon color="purple" /> Governance
          </Tag>
          <Tag>
            <BulletIcon color="gray" /> atlas-workshops
          </Tag>
          <Tag>
            <BulletIcon color="gray" /> gait
          </Tag>
        </Tags>
      </DescriptionContainer>
      <Stats>-</Stats>
    </PostCard>
  );
};

export default ForumPost;

const PostCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    boxShadow: 'unset',
    flexDirection: 'row',
  },
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  padding: 7,

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '15px 7px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: 15,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const Tags = styled('div')(() => ({
  display: 'flex',
  gap: 8,
}));

const Tag = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : 'red',

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const Stats = styled('div')(() => ({}));
