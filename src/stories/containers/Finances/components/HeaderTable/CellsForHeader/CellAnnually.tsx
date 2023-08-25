import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metric: string;
}

export const CellAnnually: React.FC<Props> = ({ metric }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCell isLight={isLight}>
      <Metric>{metric}</Metric>
    </ContainerCell>
  );
};

export default CellAnnually;

const ContainerCell = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  color: isLight ? '#231536' : 'red',
  paddingLeft: 16,
  paddingRight: 16,
  flex: 1,
  fontWeight: 500,
}));

const Metric = styled.div({
  fontSize: 11,
  textAlign: 'center',
});
