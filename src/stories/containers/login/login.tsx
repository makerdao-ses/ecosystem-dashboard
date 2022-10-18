import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

export default () => {
  return (
    <Wrapper>
      <Container>
        <Image style={{ borderRadius: '50%' }} src={'/assets/img/ses-logo-64x64.png'} width={64} height={64} />
        <Title>Log In</Title>
        <Description>Enter your username and password to get access to the administration area.</Description>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vh',
  height: 'calc(100vw - 64px)',
  overflow: 'hidden',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 64px 64px',
  position: 'absolute',
  width: '484px',
  height: '589px',
  top: '128px',
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
});

const Title = styled.h1({
  fontWeight: 600,
  fontSize: 32,
  lineHeight: '39px',
  textAlign: 'center',
  letterSpacing: 0.4,
  color: '#231536',
  marginTop: 40,
  marginBottom: 16,
});

const Description = styled.h3({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
  color: '#231536',
  marginBottom: 42,
});
