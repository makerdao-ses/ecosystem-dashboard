import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import PlaceholderImg from '../../../../public/assets/img/table-placeholder.png';

export const TablePlaceholder = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src={PlaceholderImg} alt="There are no elements" layout="fill" />
      </ImageWrapper>
      <Title>No Results Found</Title>
      <Description>
        There are no core units available with this combination of filters.
      </Description>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  background: '#FFFFFF',
  boxShadow:
    '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '20px',
  height: '100%',
  padding: '64px 32px 32px 32px',
  '@media (min-width: 834px)': {
    height: '768px',
    padding: '64px 0',
  }
});

const Title = styled.div({
  fontFamily: 'FT Base',
  fontWeight: 500,
  lineHeight: '58px',
  color: '#9FAFB9',
  fontSize: '24px',
  margin: '64px 0 16px',
  '@media (min-width: 834px)': {
    fontSize: '48px',
    margin: '96px 0 32px',
  }
});

const Description = styled.div({
  fontFamily: 'FT Base',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  color: '#708390',
  maxWidth: '240px',
  '@media (min-width: 834px)': {
    maxWidth: '380px'
  }
});

const ImageWrapper = styled.div({
  position: 'relative',
  width: '220px',
  height: '190px',
  '@media (min-width: 834px)': {
    width: '345px',
    height: '332px',
  },
});
