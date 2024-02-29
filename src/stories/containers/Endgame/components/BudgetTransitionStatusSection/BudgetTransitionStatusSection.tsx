import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetTransitionChart from '../BudgetTransitionChart/BudgetTransitionChart';
import SectionHeader from '../SectionHeader/SectionHeader';
import TransitionDataPicker from '../TransitionDataPicker/TransitionDataPicker';
import type { BudgetTransitionPlainData } from '../../types';
import type { TransitionDataPickerProps } from '../TransitionDataPicker/TransitionDataPicker';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BudgetTransitionStatusSectionProps extends TransitionDataPickerProps {
  data: BudgetTransitionPlainData;
}

const BudgetTransitionStatusSection: React.FC<BudgetTransitionStatusSectionProps> = ({
  selected,
  handleChange,
  data,
}) => {
  const { isLight } = useThemeContext();

  return (
    <Content id="section-budget-transition-status">
      <SectionHeader
        title="Budget Transition Status"
        subtitle="Some context about the trends that will be occurring, as it relates to expense and endgame that visually telegraph the changes."
      />

      <Card isLight={isLight}>
        <WidthRestriction>
          <TransitionDataPicker selected={selected} handleChange={handleChange} />
          <BudgetTransitionChart data={data} selected={selected} />
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

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 844,
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
  background: isLight ? '#fff' : '#1E2C37',
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.25)' : '#31424E'}`,
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '16px 24px 32px',
  },
}));
