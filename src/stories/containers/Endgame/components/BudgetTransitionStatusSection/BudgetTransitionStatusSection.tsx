import styled from '@emotion/styled';
import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

const BudgetTransitionStatusSection: React.FC = () => (
  <Content id="budget-transition-status">
    <SectionHeader
      title="Budget Transition Status"
      subtitle="Some context about the trends that will be occurring, as it relates to expense and endgame that visually telegraph the changes."
    />

    <div>
      here <br />
      here <br />
      here <br />
      here <br />
      here <br />
      here <br />
      here <br />
      here <br />
      here <br />
      here <br />
    </div>
  </Content>
);

export default BudgetTransitionStatusSection;

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  scrollMarginTop: 130, // here
});
