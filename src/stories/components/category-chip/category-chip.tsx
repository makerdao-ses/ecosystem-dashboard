import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';

interface StatusChipProps {
  category: CuCategoryEnum | string;
  style?: CSSProperties;
}

const colors: {[id: string]: any} = {
  Technical: {
    color: '#546978',
    background: 'rgba(246, 245, 255, 0.5)'
  },
  Support: {
    color: '#1AAB9B',
    background: 'rgba(245, 255, 246, 0.5)'
  },
  Operational: {
    color: '#9055AF',
    background: 'rgba(250, 245, 255, 0.5)'
  },
  Business: {
    color: '#F08B04',
    background: 'rgba(255, 251, 245, 0.5)'
  },
  RWAs: {
    color: '#2DC1B1',
    background: 'rgba(245, 255, 249, 0.5)'
  },
  Growth: {
    color: '#DC5D00',
    background: 'rgba(255, 245, 245, 0.5)'
  },
  Finance: {
    color: '#447AFB',
    background: 'rgba(247, 255, 245, 0.52)'
  },
  // TODO: Add correct color when it's ready
  Legal: {
    color: '#546978',
    background: 'rgba(246, 245, 255, 0.5)'
  }
};

export const CategoryChip = (props: StatusChipProps) => {
  return <Chip style={{
    color: colors[props.category].color,
    borderColor: colors[props.category].color,
    background: colors[props.category].background,
    ...props.style
  }}>{props.category}</Chip>;
};

const Chip = styled.div({
  fontFamily: 'FT Base, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '12px',
  padding: '0 8px',
  height: '22px',
  lineHeight: '22px',
  width: 'fit-content',
  border: '1px solid black',
  boxSizing: 'border-box',
});
