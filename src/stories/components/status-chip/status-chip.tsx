import React from 'react';
import { Chip } from '@mui/material';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';

interface StatusChipProps {
  status: CuStatusEnum;
}

export const StatusChip = (props: StatusChipProps) => {
  return <Chip size={'small'} sx={{ borderRadius: '8px', borderColor: '#25273D', fontSize: '12px' }} label={props.status}
               variant={'outlined'}/>;
};
