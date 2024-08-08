import { styled } from '@mui/material';
import { useState } from 'react';
import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import BulletIcon from '@/components/FancyTabs/BulletIcon';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import ForumPost from '../ForumPost/ForumPost';

const ForumOverview = () => {
  const [activeTab, setActiveTab] = useState<string>('4');

  return (
    <ShadowWrapper>
      <FancyTabs
        tabs={[
          {
            id: '1',
            title: 'Popular',
            icon: <BulletIcon color="green" />,
          },
          {
            id: '2',
            title: 'Onboarding',
            icon: <BulletIcon color="charcoal" />,
          },
          {
            id: '3',
            title: 'Finances',
            icon: <BulletIcon color="green" />,
          },
          {
            id: '4',
            title: 'Governance',
            icon: <BulletIcon color="purple" />,
          },
          {
            id: '5',
            title: 'Atlas',
            icon: <BulletIcon color="orange" />,
          },
          {
            id: '6',
            title: 'Teams',
            icon: <BulletIcon color="blue" />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab)}
      />
      <ForumCard>
        <HeaderTop>
          <Text>
            <span>Maker Forum:</span> Decision-making frameworks, including proposal discussions, voting mechanisms, and
            policy updates.
          </Text>
          <ExternalLinkButton href="https://forum.makerdao.com/">Go to Forum</ExternalLinkButton>
        </HeaderTop>

        <PostList>
          <ForumPost />
          <ForumPost />
          <ForumPost />
          <ForumPost />
        </PostList>
      </ForumCard>
    </ShadowWrapper>
  );
};

export default ForumOverview;

const ForumCard = styled(Card)(() => ({
  boxShadow: 'none',
  borderTopLeftRadius: 0,
}));

const HeaderTop = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '8px 16px',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'red',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& a': {
      whiteSpace: 'nowrap',
      height: 'fit-content',
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

const Text = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',

  '& span': {
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : 'red',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const PostList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
}));
