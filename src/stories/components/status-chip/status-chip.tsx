import React from 'react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';

interface StatusChipProps {
  status: CuStatusEnum;
}

const colors = {
  Accepted: {
    color: '#02CB9B',
    background: '#EBFFFA'
  },
  Rejected: {
    color: '#FF4085',
    background: '#FFF0F4'
  },
  RFC: {
    color: '#8F2EC1',
    background: '#FBF2FF'
  },
  'Formal Submission': {
    color: '#00B5D3',
    background: '#EEFAFC'
  },
  Obsolete: {
    color: '#635696',
    background: '#F7F4FF'
  },
  Withdrawn: {
    color: '#AD927D',
    background: '#FFF9F4'
  }
};

export const StatusChip = (props: StatusChipProps) => {
  return <Chip style={{
    color: colors[props.status].color,
    background: colors[props.status].background,
  }}>{props.status}</Chip>;
};

const Chip = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '12px',
  padding: '0 8px',
  height: '22px',
  fontFamily: (theme as Theme).typography.fontFamily,
}));
