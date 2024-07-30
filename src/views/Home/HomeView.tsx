import { styled } from '@mui/material';

import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import ContributorsSection from './components/Contributors/ContributorsSection';
import FinancesBarChartCard from './components/FinancesBarChartCard/FinancesBarChartCard';
import FinancesLineChartCard from './components/FinancesLineChartCard/FinancesLineChartCard';
import HeaderCard from './components/HeaderCard/HeaderCard';

import { headerCardData, sectionsData } from './staticData';
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
        <Section id={headerCardData.buttonTexts[0].toLowerCase()}>
          <SectionTitle>{sectionsData.titles[0]}</SectionTitle>
          <Finances>
            <FinancesBarChartCard />
            <FinancesLineChartCard />
          </Finances>
        </Section>
        <Section id={headerCardData.buttonTexts[1].toLowerCase()}>
          <SectionTitle>{sectionsData.titles[1]}</SectionTitle>
        </Section>
        <Section id={headerCardData.buttonTexts[2].toLowerCase()}>
          <SectionTitle>{sectionsData.titles[2]}</SectionTitle>
          <ContainerMargin>
            <ContributorsSection />
          </ContainerMargin>
        </Section>
        <Section id={headerCardData.buttonTexts[3].toLowerCase()}>
          <SectionTitle>{sectionsData.titles[3]}</SectionTitle>
        </Section>
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
  minHeight: 800,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  scrollSnapAlign: 'start',
  scrollMarginTop: 80,

  [theme.breakpoints.up('tablet_768')]: {
    scrollMarginTop: 110,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

const SectionTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 24,
  lineHeight: '28.8px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[300],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
}));

const Finances = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
  },
}));

const ContainerMargin = styled('div')({
  marginTop: 24,
});
