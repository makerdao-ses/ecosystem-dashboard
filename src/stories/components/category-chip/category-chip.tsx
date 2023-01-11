import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import type { CSSProperties } from 'react';

interface StatusChipProps {
  category: CuCategoryEnum | string;
  style?: CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors: { [id: string]: any } = {
  All: {
    color: '#5D48FF',
    background: '#F7F5FF',
    colorDark: '#5D48FF',
    backgroundDark: '#715fff26',
  },
  Technical: {
    color: '#546978',
    background: 'rgba(246, 245, 255, 0.5)',
    colorDark: '#7D8FAA',
    backgroundDark: '#615eff26',
  },
  Support: {
    color: '#1AAB9B',
    background: 'rgba(245, 255, 246, 0.5)',
    colorDark: '#00ED18',
    backgroundDark: '#5cff6326',
  },
  Operational: {
    color: '#9055AF',
    background: 'rgba(250, 245, 255, 0.5)',
    colorDark: '#8F2EC1',
    backgroundDark: '#8728ff26',
  },
  Business: {
    color: '#F08B04',
    background: 'rgba(255, 251, 245, 0.5)',
    colorDark: '#FF8237',
    backgroundDark: '#ffa23526',
  },
  RWAs: {
    color: '#2DC1B1',
    background: 'rgba(245, 255, 249, 0.5)',
    colorDark: '#02CB9B',
    backgroundDark: '#50ff9626',
  },
  Growth: {
    color: '#DC5D00',
    background: 'rgba(255, 245, 245, 0.5)',
    colorDark: '#EF5277',
    backgroundDark: '#ff565626',
  },
  Finance: {
    color: '#447AFB',
    background: 'rgba(247, 255, 245, 0.52)',
    colorDark: '#34AAFF',
    backgroundDark: '#4992ff26',
  },
  // TODO: Add correct color when it's ready
  Legal: {
    color: '#546978',
    background: 'rgba(246, 245, 255, 0.5)',
    colorDark: '#546978',
    backgroundDark: '#54697826',
  },
};

export const CategoryChip = (props: StatusChipProps) => {
  const { isLight } = useThemeContext();
  return (
    <Chip
      style={{
        color: isLight ? colors[props.category].color : colors[props.category].colorDark,
        borderColor: isLight ? colors[props.category].color : colors[props.category].colorDark,
        background: isLight ? colors[props.category].background : colors[props.category].backgroundDark,
        ...props.style,
      }}
    >
      {props.category}
    </Chip>
  );
};

const Chip = styled.div({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '12px',
  padding: '4px 8px',
  height: '22px',
  lineHeight: '13px',
  width: 'fit-content',
  border: '1px solid black',
  boxSizing: 'border-box',
  paddingBottom: '2px',
});
