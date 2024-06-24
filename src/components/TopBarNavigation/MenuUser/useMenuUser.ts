import { useCallback, useEffect, useState } from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import type React from 'react';

const useMenuUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLight } = useThemeContext();
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
    handleClick,
    handleScroll,
    handleClose,
    anchorEl,
    setAnchorEl,
  };
};
export default useMenuUser;
