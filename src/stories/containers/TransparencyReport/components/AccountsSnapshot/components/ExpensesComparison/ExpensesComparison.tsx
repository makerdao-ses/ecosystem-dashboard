import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

const ExpensesComparison: React.FC = () => (
  <div>
    <SectionHeader
      title="Reported Expenses Comparison"
      subtitle={'Reported actuals compared to expense and revenue transactions.'}
      tooltip={'pending...'}
    />
  </div>
);

export default ExpensesComparison;
