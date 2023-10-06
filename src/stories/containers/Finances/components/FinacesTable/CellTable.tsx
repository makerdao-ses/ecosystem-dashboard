import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: string[];
}

const CellTable: React.FC<Props> = ({ metrics }) => {
  const { isLight } = useThemeContext();
  return (
    <Cell isLight={isLight}>
      <SpacedValues>
        {metrics.map((_, index) => (
          <span key={index}>2208889</span>
        ))}
      </SpacedValues>
    </Cell>
  );
};

export default CellTable;

const Cell = styled.td<WithIsLight>(({ isLight }) => ({
  borderRight: `1px solid ${isLight ? '#D8E0E3' : 'red'}`,
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));

const SpacedValues = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
});
