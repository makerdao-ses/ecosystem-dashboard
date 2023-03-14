import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

import { CustomPopover } from '../CustomPopover/CustomPopover';

import type { SxProps } from '@mui/material';
export type AlignArrowTooTip = 'left' | 'center' | 'right';
interface Props {
  elementShowToolTip: JSX.Element | string;
  children: JSX.Element | JSX.Element[];
  handleIsOpen?: (isOpen: boolean) => void;
  sxProps?: SxProps;
}

const PopoverMobile: React.FC<Props> = ({ elementShowToolTip, children, handleIsOpen, sxProps }) => {
  const { isLight } = useThemeContext();
  return (
    <CustomPopover
      sxProps={sxProps}
      handleIsOpen={handleIsOpen}
      title={<ContainerPopover>{elementShowToolTip}</ContainerPopover>}
      children={children}
      id="mobile-popover"
      popoverStyle={{
        background: isLight ? 'white' : '#000A13',
        border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
        boxShadow: isLight
          ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
          : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
        borderRadius: '22px 22px 0px 0px',
      }}
    />
  );
};
const ContainerPopover = styled.div({
  width: 343,
});

export default PopoverMobile;
