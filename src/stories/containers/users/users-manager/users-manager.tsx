import styled from '@emotion/styled';
import React from 'react';
import { Tabs } from '../../../components/tabs/tabs';

export default () => {
  return (
    <Wrapper>
      <Container>
        <Tabs
          currentIndex={1}
          items={[
            {
              item: 'Your Profile',
              id: 'profile',
            },
            {
              item: 'Manage Accounts',
              id: 'manage',
            },
          ]}
        />
        <h1>Users Manager</h1>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  marginTop: '64px',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const Container = styled.div({
  marginTop: '24x',
  maxWidth: '1184px',
  width: '100%',
});
