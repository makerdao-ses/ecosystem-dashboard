import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';

interface NumberWithSignCardSkeletonProps {
  sign: 'positive' | 'negative';
}

const NumberWithSignCardSkeleton: React.FC<NumberWithSignCardSkeletonProps> = ({ sign }) => {
  const { isLight } = useThemeContext();
  const fill = isLight ? '#ECF1F3' : '#31424E';

  return (
    <Container>
      <SignContainer>
        {sign === 'positive' ? (
          <PlusSVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" width="4" height="24" rx="2" fill={fill} />
            <rect y="14" width="4" height="24" rx="2" transform="rotate(-90 0 14)" fill={fill} />
          </PlusSVG>
        ) : (
          <MinusSVG viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4" width="4" height="24" rx="2" transform="rotate(-90 0 4)" fill={fill} />
          </MinusSVG>
        )}
      </SignContainer>
      <ValueContainer>
        <ValueWrapper>
          <Value isLight={isLight} />
          <Currency isLight={isLight} />
        </ValueWrapper>
        <Caption isLight={isLight} />
      </ValueContainer>
    </Container>
  );
};

export default NumberWithSignCardSkeleton;

const Container = styled.div({
  display: 'flex',

  [lightTheme.breakpoints.up('table_834')]: {
    width: '100%',
  },
});

const SignContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: 4,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginRight: 8,
  },
});

const PlusSVG = styled.svg({
  width: 16,
  height: 16,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 24,
    height: 24,
  },
});

const MinusSVG = styled.svg({
  width: 16,
  height: 4,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 24,
    height: 4,
  },
});

const ValueContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  borderRadius: 6,
  background: 'rgba(236, 239, 249, 0.30)',
  padding: '8px 12px 11.38px',

  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-start',
    padding: '8px 8px 11.38px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '8px 8px 16px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '10px 32.5px 16px',
  },
});

const ValueWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: 4,
  marginBottom: 9.5,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 10,
    gap: 6.5,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 12,
    gap: 9,
  },
});

const Value = styled(BaseSkeleton)({
  width: 73,
  height: 14,

  [lightTheme.breakpoints.up('table_834')]: {
    width: 100,
    height: 17,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 145,
    height: 26,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 126,
    height: 26.25,
  },
});

const Currency = styled(BaseSkeleton)({
  width: 22,
  height: 10.5,

  [lightTheme.breakpoints.up('table_834')]: {
    width: 29,
    height: 14,
  },
});

const Caption = styled(BaseSkeleton)({
  maxWidth: 143,
  height: 9.63,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 150,
    height: 14,
  },
});
