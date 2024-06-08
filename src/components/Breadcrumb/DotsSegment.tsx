import { Menu, MenuItem, styled, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Ellipsis from 'public/assets/svg/ellipsis.svg';
import { useId, useState } from 'react';
import type { BreadcrumbItem } from './Breadcrumb';
import type { Theme } from '@mui/material';

interface DotsSegmentProps {
  items: BreadcrumbItem[];
}

const DotsSegment: React.FC<DotsSegmentProps> = ({ items }) => {
  const iconId = useId();
  const menuId = useId();
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Icon
        id={iconId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Ellipsis />
      </Icon>

      <StyledMenu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': iconId,
        }}
        autoFocus={false}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleClose} autoFocus={false}>
            {isMobileOrTablet && index === items.length - 1 ? (
              <span>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default DotsSegment;

const Icon = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  padding: '0 4px',
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : 'red',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: theme.palette.isLight ? 'white' : 'red',
    boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : 'red',
    padding: 16,
    maxWidth: 273,

    '&.MuiPaper-rounded': {
      borderRadius: 12,
    },
  },

  '& .MuiMenu-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 0,
    borderRadius: 12,
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'red',
    boxShadow: theme.palette.isLight ? theme.fusionShadows.innerShadow : 'red',
    overflow: 'hidden',

    '& span, & a': {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 8,
    },
  },

  '& .MuiMenuItem-root': {
    padding: 0,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '17px',
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
    minHeight: 32,

    '& a': {
      fontWeight: 400,
    },

    '&:hover': {
      background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'red',
    },
  },
}));
