import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { DeliverableStatus } from '@ses/core/models/interfaces/projects';
import React, { useMemo } from 'react';
import { getChipColors } from '../../utils/colors';

interface DeliverableStatusChipProps {
  status: DeliverableStatus;
}

const DeliverableStatusChip: React.FC<DeliverableStatusChipProps> = ({ status }) => {
  const label = useMemo(() => {
    switch (status) {
      case DeliverableStatus.INPROGRESS:
        return 'In Progress';
      case DeliverableStatus.DELIVERED:
        return 'Delivered';
      default:
        return 'To do';
    }
  }, [status]);

  const { color, background } = useMemo(() => getChipColors(status), [status]);

  return <StatusChip label={label} textColor={color} background={background} />;
};

export default DeliverableStatusChip;

const StatusChip = styled(Chip)<{ textColor: string; background: string }>(({ textColor, background }) => ({
  padding: '1.5px 7px',
  borderRadius: 24,
  border: `1px solid ${textColor}`,
  background,
  height: 'auto',

  '.MuiChip-label': {
    fontSize: 14,
    lineHeight: 'normal',
    color: textColor,
    padding: 0,
  },
}));
