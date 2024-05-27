import { styled } from '@mui/material';
import Popover from '@mui/material/Popover';
import React, { useCallback, useEffect, useRef } from 'react';
import ButtonLinkOptions from '@/components/ButtonLink/ButtonLinkOptions';
import LinkList from '../LinkList/LinkList';

const PopoverListLinks = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleScroll = useCallback(() => {
    handleClose();
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        anchorEl &&
        !anchorEl.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    },
    [anchorEl]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside, handleScroll, open]);

  return (
    <div>
      <ButtonLinkOptions label="Links" onClick={handleClick} />

      <ContainerPopover
        disableScrollLock
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        ref={popoverRef}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <LinkList onClick={handleClose} />
      </ContainerPopover>
    </div>
  );
};

const ContainerPopover = styled(Popover)({
  '& .MuiPaper-root': {
    borderRadius: '12px !important',
  },
});

export default PopoverListLinks;
