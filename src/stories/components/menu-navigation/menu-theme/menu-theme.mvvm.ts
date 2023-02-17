import React, { useCallback, useEffect } from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';

const useMenuThemeMVVM = () => {
  const { isLight } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleScroll = useCallback(() => {
    if (open) {
      handleClose();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, open]);

  return {
    open,
    isLight,
    anchorEl,
    setAnchorEl,
    handleClose,
    handleClick,
  };
};
export default useMenuThemeMVVM;
