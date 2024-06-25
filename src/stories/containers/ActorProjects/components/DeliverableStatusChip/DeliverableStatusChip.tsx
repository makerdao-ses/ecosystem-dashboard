import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React, { useMemo } from 'react';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';
import { getChipColors } from '../../utils/colors';

interface DeliverableStatusChipProps {
  status: DeliverableStatus;
}

const DeliverableStatusChip: React.FC<DeliverableStatusChipProps> = ({ status }) => {
  const { isLight } = useThemeContext();
  const label = useMemo(() => {
    switch (status) {
      case DeliverableStatus.IN_PROGRESS:
        return 'In Progress';
      case DeliverableStatus.DELIVERED:
        return 'Delivered';
      default:
        return 'To do';
    }
  }, [status]);

  const { color, background } = useMemo(() => getChipColors(status, isLight), [isLight, status]);

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
