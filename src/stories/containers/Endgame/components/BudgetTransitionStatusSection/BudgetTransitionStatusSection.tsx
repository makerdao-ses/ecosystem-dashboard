import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransitionDataPicker from '../TransitionDataPicker/TransitionDataPicker';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetTransitionStatusSection: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Content id="section-budget-transition-status">
      <SectionHeader
        title="Budget Transition Status"
        subtitle="Some context about the trends that will be occurring, as it relates to expense and endgame that visually telegraph the changes."
      />

      <Card isLight={isLight}>
        <WidthRestriction>
          <TransitionDataPicker />
        </WidthRestriction>
      </Card>
    </Content>
  );
};

export default BudgetTransitionStatusSection;

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  scrollMarginTop: 130, // here
});

const WidthRestriction = styled.div({
  margin: '0 auto',
  width: '100%',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 932,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
  },
});

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  borderRadius: 6,
  padding: '16px 8px 24px',
  background: isLight ? '#fff' : 'red',
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.25)' : 'red'}`,
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px red, 0px 20px 40px 0px red',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '16px 54px 32px',
  },
}));
