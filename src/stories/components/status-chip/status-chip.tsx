import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface StatusChipProps {
  status: CuStatusEnum | 'All';
  style?: CSSProperties;
}

const colors: { [id: string]: any } = {
  All: {
    color: '#5D48FF',
    background: '#F7F5FF',
    colorDark: '#5D48FF',
    backgroundDark: '#432CFF33'
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
    backgroundDark: '#B72EFF33'
  },
  'Formal Submission': {
    color: '#00B5D3',
    background: '#EEFAFC',
    colorDark: '#00B5D3',
    backgroundDark: '#42E8FF33'
  },
  Obsolete: {
    color: '#635696',
    background: '#F7F4FF',
    colorDark: '#6C40AA',
    backgroundDark: '#5426FF33'
  },
  Withdrawn: {
    color: '#AD927D',
    background: '#FFF9F4',
    colorDark: '#AD927D',
    backgroundDark: '#FF8E3633',
  }
};

export const StatusChip = (props: StatusChipProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Chip style={{
    color: isLight ? colors[props.status].color : colors[props.status].colorDark,
    background: isLight ? colors[props.status].background : colors[props.status].backgroundDark,
    ...props.style,
  }}>{props.status}</Chip>;
};

const Chip = styled.div({
  fontFamily: 'SF Pro Text, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '12px',
  padding: '0 8px',
  height: '22px',
  width: 'fit-content',
});
