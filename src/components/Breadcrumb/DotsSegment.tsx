import { Menu, MenuItem, styled } from '@mui/material';
import Link from 'next/link';
import Ellipsis from 'public/assets/svg/ellipsis.svg';
import { useId, useState } from 'react';
import type { BreadcrumbItem } from './Breadcrumb';

interface DotsSegmentProps {
  items: BreadcrumbItem[];
}

const DotsSegment: React.FC<DotsSegmentProps> = ({ items }) => {
  const iconId = useId();
  const menuId = useId();
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

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': iconId,
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <Link href={item.href}>{item.label}</Link>
          </MenuItem>
        ))}
      </Menu>
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
