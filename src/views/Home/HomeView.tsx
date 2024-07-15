import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import HeaderCard from './components/HeaderCard/HeaderCard';
import type { FC } from 'react';

const HomeView: FC = () => (
  <HomeViewContainer>
    <SEOHead
      title="Homepage title"
      description="Homepage description"
      image={{
        src: toAbsoluteURL('/assets/img/social-385x200.png'),
        width: 385,
        height: 200,
      }}
      twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
    />
    <Container>
      <HeaderCard />
    </Container>
  </HomeViewContainer>
);

export default HomeView;

const HomeViewContainer = styled(PageContainer)(() => ({
  marginTop: 24,
}));
