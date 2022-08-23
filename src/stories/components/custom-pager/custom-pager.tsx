import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft } from '../svg/chevron-left';
import { ChevronRight } from '../svg/chevron-right';

interface CustomPagerProps {
  label: JSX.Element | string,
  onNext?: () => void,
  onPrev?: () => void,
  hasNext?: boolean,
}

export const CustomPager = (props: CustomPagerProps) => {
  return <Container className="no-select">
    <Arrows>
      <IconWrapper onClick={props.onPrev}>
        <ChevronLeft/>
      </IconWrapper>
      <IconWrapper disabled={!props.hasNext} onClick={props.onNext}>
        <ChevronRight fill={props.hasNext ? undefined : '#D1DEE6'}/>
      </IconWrapper>
    </Arrows>
    <Label>{props.label}</Label>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  '@media (min-width: 834px)': {
    flexDirection: 'row'
  }
});

const Label = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  marginRight: '16px',
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
    margin: '8px',
  }
});

const Arrows = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginTop: '4px',
});

const IconWrapper = styled.div<{disabled?: boolean}>(({ disabled = false }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px',
  cursor: disabled ? 'default' : 'pointer'
}));
