import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import IntroductoryHeadline from './components/IntroductoryHeadline/IntroductoryHeadline';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';

const EndgameContainer: React.FC = () => (
  <EndgamePageContainer>
    <Container>
      <IntroductoryHeadline />
      <NavigationTabs />

      <div style={{ height: 800 }} />
    </Container>
  </EndgamePageContainer>
);

export default EndgameContainer;

const EndgamePageContainer = styled(PageContainer)({
  marginTop: 32,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 40,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
});
