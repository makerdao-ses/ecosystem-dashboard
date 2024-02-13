import { styled, useTheme } from '@mui/material';
import React from 'react';
import { Close } from '../svg/close';

interface Props {
  isDisabled: boolean;
  handleResetFilter: () => void;
}

const ResponsiveButtonClearFilter: React.FC<Props> = ({ isDisabled, handleResetFilter }) => {
  const theme = useTheme();
  const colorButton =
    theme.palette.mode === 'light' ? (isDisabled ? '#ECEFF9' : '#231536') : isDisabled ? '#48495F' : '#D4D9E1';
  return (
    <ResponsiveButton onClick={!isDisabled ? handleResetFilter : undefined} isDisabled={isDisabled}>
      <Close width={10} height={10} fill={colorButton} fillDark={colorButton} />
    </ResponsiveButton>
  );
};

export default ResponsiveButtonClearFilter;

const ResponsiveButton = styled('div')<{ isDisabled: boolean }>(({ theme, isDisabled }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  height: '34px',
  cursor: 'pointer',
  width: '34px',
  border:
    theme.palette.mode === 'light'
      ? `1px solid ${isDisabled ? '#ECEFF9' : '#D4D9E1'}`
      : `1px solid ${isDisabled ? '#10191F' : '#D4D9E1'}`,
  borderRadius: '22px',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
