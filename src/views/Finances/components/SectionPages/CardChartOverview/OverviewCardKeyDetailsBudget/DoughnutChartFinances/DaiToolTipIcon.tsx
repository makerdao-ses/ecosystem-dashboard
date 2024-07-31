import { styled } from '@mui/material';
import DAI from 'public/assets/svg/dai.svg';
import InfoOutlined from 'public/assets/svg/info_outlined.svg';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';

const DaiToolTipIcon: React.FC = () => (
  <Wrapper>
    <DAIIconStyled />
    <SESTooltip content={'All amounts are in DAI'} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000}>
      <IconWrapper>
        <InfoOutlined height={14} width={14} />
      </IconWrapper>
    </SESTooltip>
  </Wrapper>
);

export default DaiToolTipIcon;

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

const IconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 13,
  right: 12,
  display: 'flex',
  backgroundColor: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  justifyContent: 'center',
  width: 17.3,
  height: 17.3,
  borderRadius: '50%',
  alignItems: 'center',
  cursor: 'pointer',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[400],
  },

  '&:hover path': {
    fill: theme.palette.colors.slate[300],
  },
}));

const DAIIconStyled = styled(DAI)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 29,
  height: 25,

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[400],
  },

  '& circle': {
    fill: theme.palette.isLight ? 'white' : 'transparent',
  },
}));
