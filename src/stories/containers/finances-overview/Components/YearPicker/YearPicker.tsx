import React from 'react';

const YearPicker = () => {
  const years = [2021, 2022, 2023];

  return (
    <div style={{ display: 'flex' }}>
      {years.map((year) => (
        <div key={year}>{year}</div>
      ))}
    </div>
  );
};

export default YearPicker;
