import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import FundChangeCardSkeleton from '../Cards/FundChangeCardSkeleton';
import SimpleStatCardSkeleton from '../Cards/SimpleStatCardSkeleton';
import TransactionHistorySkeleton from '../TransactionHistory/TransactionHistorySkeleton';

const FundingOverviewSkeleton: React.FC = () => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
  const enableCurrencyPicker = isEnabled('FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER');

  return (
    <Container>
      <HeaderContainer>
        <TitleWrapper>
          <TitleSkeleton isLight={isLight} />
          <SubtitleContainer>
            <SubtitleLine1 isLight={isLight} />
            <SubtitleLine2 isLight={isLight} />
            <SubtitleLine3 isLight={isLight} />
          </SubtitleContainer>
        </TitleWrapper>

        {enableCurrencyPicker && <CurrencyPicker isLight={isLight} />}
      </HeaderContainer>

      <CardsContainer>
        <SimpleStatCardSkeleton />
        <FundChangeCardSkeleton />
        <SimpleStatCardSkeleton withEquals={true} />
      </CardsContainer>

      <TransactionHistorySkeleton />
    </Container>
  );
};

export default FundingOverviewSkeleton;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const HeaderContainer = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 0,
    marginBottom: 0,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginBottom: 8,
  },
});

const TitleWrapper = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    width: '100%',
  },
});

const TitleSkeleton = styled(BaseSkeleton)({
  maxWidth: 293,
  height: 17.5,
  marginBottom: 14.5,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
    height: 21,
    marginBottom: 21,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 386,
    marginBottom: 13,
  },
});

const SubtitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 5.25,

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 6,
  },
});

const SubtitleLine = styled(BaseSkeleton)({
  height: 12.25,

  [lightTheme.breakpoints.up('table_834')]: {
    height: 14,
  },
});

const SubtitleLine1 = styled(SubtitleLine)({
  maxWidth: 329,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 423,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 408,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 666,
  },
});

const SubtitleLine2 = styled(SubtitleLine)({
  maxWidth: 221,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 321,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
});

const SubtitleLine3 = styled(SubtitleLine)({
  maxWidth: 230,

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const CurrencyPicker = styled(BaseSkeleton)({
  marginTop: 12.75,
  maxWidth: 107,
  height: 34,
  borderRadius: 20,
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 8,
    marginLeft: 0,
    maxWidth: 129,
    height: 48,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 0,
  },
});

export const CardsContainer = styled.div({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',

  '& > div:nth-of-type(1)': {
    order: 1,
    width: 'calc(50% - 4px)',
  },
  '& > div:nth-of-type(2)': {
    order: 3,
  },
  '& > div:nth-of-type(3)': {
    order: 2,
    width: 'calc(50% - 4px)',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    flexWrap: 'nowrap',

    '& > div:nth-of-type(1)': {
      order: 1,
      width: '100%',
    },
    '& > div:nth-of-type(2)': {
      order: 2,
    },
    '& > div:nth-of-type(3)': {
      order: 3,
      width: '100%',
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 24,
    marginTop: -2,
  },
});
