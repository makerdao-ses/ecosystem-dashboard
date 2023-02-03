import React from 'react';
import QuarterCard from '../QuarterCard/QuarterCard';

const QuarterCarousel: React.FC = () => {
  const items = [
    {
      period: '2022-Q4',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      budgetCap: 15132650.0,
    },
    {
      period: '2023-Q1',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 0.0,
      budgetCap: 15132650.0,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: 15,
      }}
    >
      {items.map((item, index) => (
        <QuarterCard key={index} {...item} />
      ))}
    </div>
  );
};

export default QuarterCarousel;
