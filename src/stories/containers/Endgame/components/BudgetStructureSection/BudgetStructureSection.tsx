import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import TotalBudgetContent from '../TotalBudgetContent/TotalBudgetContent';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetStructureSection: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Content>
      <SectionHeader
        title="Endgame Budget Structure"
        subtitle="Some simple but poignant text about what endgame budgets are about"
      />

      <Card isLight={isLight}>
        <TotalBudgetContent />
        <div
          style={{
            width: '100%',
            height: 240,
            background: '#00000011',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Doughnut Chart here...
        </div>
      </Card>
    </Content>
  );
};

export default BudgetStructureSection;

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '31px 15px 0px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  borderRadius: 6,
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.25)' : 'red'}`,
  background: isLight ? '#FFF' : 'red',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px red, 0px 20px 40px 0px red',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    padding: '31px 15px',
    gap: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '31px 63px',
    gap: 64,
  },
}));
