import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import HeaderCard from './components/HeaderCard/HeaderCard';
import { headerCardData } from './staticData';
import useHomeView from './useHomeView';
import type { FC } from 'react';

const HomeView: FC = () => {
  useHomeView();

  return (
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
        <Section id={headerCardData.buttonTexts[0].toLowerCase()} />
        <Section id={headerCardData.buttonTexts[1].toLowerCase()} />
        <Section id={headerCardData.buttonTexts[2].toLowerCase()} />
        <Section id={headerCardData.buttonTexts[3].toLowerCase()} />
      </Container>
    </HomeViewContainer>
  );
};

export default HomeView;

const HomeViewContainer = styled(PageContainer)(() => ({
  marginTop: 24,
}));

const Section = styled('section')(({ theme }) => ({
  width: '100%',
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  border: '1px solid #000',
  scrollSnapAlign: 'start',
  scrollMarginTop: 80,

  [theme.breakpoints.up('tablet_768')]: {
    scrollMarginTop: 110,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));
