import { styled } from '@mui/material';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import DAIIcon from '@ses/components/svg/DAIIcon';
import Information from '@ses/components/svg/information';
import React from 'react';

const DaiToolTipIcon = () => (
  <Tooltip>
    <DAIIconStyled />
    <SESTooltip content={'All amounts are in DAI'} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000}>
      <IconWrapper>
        <Information height={16} width={16} />
      </IconWrapper>
    </SESTooltip>
  </Tooltip>
);

export default DaiToolTipIcon;

const Tooltip = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const IconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 8,
  right: 12,
  display: 'flex',
  backgroundColor: theme.palette.mode === 'light' ? 'white' : '#1E2C37',
  justifyContent: 'center',
  width: 20,
  height: 20,
  borderRadius: '50%',
  alignItems: 'center',

  '& svg': {
    fill: theme.palette.mode === 'light' ? '#32373B' : '#6F7A85',
  },
}));

const DAIIconStyled = styled(DAIIcon)(({ theme }) => ({
  position: 'relative',
  width: 64,
  height: 64,
  '& path': {
    fill: theme.palette.mode === 'light' ? '#32373B' : '#6F7A85',
  },
  '& circle': {
    fill: theme.palette.mode === 'light' ? 'white' : 'transparent',
  },
}));
