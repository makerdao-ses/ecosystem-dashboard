import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CuMipStatus } from '@ses/core/models/interfaces/types';
import type { CSSProperties } from 'react';

interface StatusChipProps {
  status: CuMipStatus | 'All';
  style?: CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors: { [id: string]: any } = {
  All: {
    color: '#5D48FF',
    background: '#F7F5FF',
    colorDark: '#5D48FF',
    backgroundDark: '#432CFF33',
  },
  Accepted: {
    color: '#02CB9B',
    background: '#EBFFFA',
    colorDark: '#00ED18',
    backgroundDark: '#17FFC833',
  },
  Rejected: {
    color: '#FF4085',
    background: '#FFF0F4',
    colorDark: '#FF4085',
    backgroundDark: '#FF467233',
  },
  RFC: {
    color: '#8F2EC1',
    background: '#FBF2FF',
    colorDark: '#8F2EC1',
    backgroundDark: '#B72EFF33',
  },
  'Formal Submission': {
    color: '#00B5D3',
    background: '#EEFAFC',
    colorDark: '#00B5D3',
    backgroundDark: '#42E8FF33',
  },
  Obsolete: {
    color: '#635696',
    background: '#F7F4FF',
    colorDark: '#6C40AA',
    backgroundDark: '#5426FF33',
  },
  Withdrawn: {
    color: '#AD927D',
    background: '#FFF9F4',
    colorDark: '#AD927D',
    backgroundDark: '#FF8E3633',
  },
};
/**
 * @deprecated use StatusChip  instead
 */
export const StatusChipLegacy = (props: StatusChipProps) => {
  const { isLight } = useThemeContext();
  return (
    <Chip
      style={{
        color: isLight ? colors[props.status]?.color : colors[props.status]?.colorDark,
        background: isLight ? colors[props.status]?.background : colors[props.status]?.backgroundDark,
        ...props.style,
      }}
    >
      {props.status}
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
  width: 'fit-content',
  lineHeight: '13px',
});
