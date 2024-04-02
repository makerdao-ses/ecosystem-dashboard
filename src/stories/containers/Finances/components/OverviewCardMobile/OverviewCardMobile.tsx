import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import InformationBudgetCapOverview from '../OverviewCardKeyDetailsBudget/InformationBudgetCapOverView/InformationBudgetCapOverView';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  paymentsOnChain: number;
  budgetCap: number;
}

const OverviewCardMobile: React.FC<Props> = ({ paymentsOnChain, budgetCap }) => {
  const { isLight } = useThemeContext();

  return (
    <InformationBudgetCapOverviewStyled isLight={isLight} paymentsOnChain={paymentsOnChain} budgetCap={budgetCap} />
  );
};

export default OverviewCardMobile;

const InformationBudgetCapOverviewStyled = styled(InformationBudgetCapOverview)<WithIsLight>(({ isLight }) => ({
  padding: 16,
  borderRadius: '6px',
  background: isLight ? '#FFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));
