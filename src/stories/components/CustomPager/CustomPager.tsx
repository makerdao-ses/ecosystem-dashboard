import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import { ChevronLeft } from '../svg/chevron-left';
import { ChevronRight } from '../svg/chevron-right';

interface CustomPagerProps {
  label: JSX.Element | string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  marginLeft?: string;
  className?: string;
}

export const CustomPager = (props: CustomPagerProps) => {
  const { isLight } = useThemeContext();

  return (
    <Container className={`${props.className} 'no-select'`}>
      <Arrows>
        <IconWrapper onClick={props.onPrev} disabled={!props.hasPrevious}>
          <ChevronLeft fill={props.hasPrevious ? undefined : isLight ? '#D1DEE6' : '#31424E'} />
        </IconWrapper>
        <IconWrapper disabled={!props.hasNext} onClick={props.onNext}>
          <ChevronRight fill={props.hasNext ? undefined : isLight ? '#D1DEE6' : '#31424E'} />
        </IconWrapper>
      </Arrows>
      <Label>{props.label}</Label>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
});

const Label = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  marginLeft: '16px',
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  },
});

const Arrows = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const IconWrapper = styled.div<{ disabled?: boolean }>(({ disabled = false }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: disabled ? 'default' : 'pointer',
}));
