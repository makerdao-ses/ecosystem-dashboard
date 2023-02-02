import React from 'react';

const QuarterCarousel: React.FC = () => {
  const items = ['card 1', 'card 2', 'card 3'];

  return (
    <div style={{ display: 'flex' }}>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

export default QuarterCarousel;
