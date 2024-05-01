import { IconButton, Menu, MenuItem, styled, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  title: string;
  items: {
    label: string | JSX.Element;
    url: string;
    style?: React.CSSProperties;
  }[];
  className?: string;
  hasIcon?: boolean;
}

const BreadCrumbWithIcons = ({ title, items = [], className, hasIcon = true }: Props) => {
  const { isLight } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={className}>
      {hasIcon && (
        <ArrowBackIconButton
          aria-controls={open ? 'fade-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.109783 7.10624L0 6.99996L0.109783 6.89377L0.788671 6.23644L0.789602 6.23554L6.90382 0.316445C7.33965 -0.105481 8.04627 -0.105481 8.4821 0.316445C8.91792 0.738372 8.91792 1.42245 8.4821 1.84438L4.27261 5.9196L17.884 5.9196C18.5003 5.9196 19 6.40323 19 6.99996C19 7.59668 18.5003 8.08041 17.884 8.08041L4.27261 8.08041L8.4821 12.1556C8.91792 12.5775 8.91792 13.2616 8.4821 13.6835C8.04627 14.1055 7.33965 14.1055 6.90382 13.6835L0.789602 7.76441L0.788671 7.7635L0.109783 7.10624Z"
              fill={isLight ? '#231536' : '#E2D8EE'}
            />
          </svg>
        </ArrowBackIconButton>
      )}
      <Menu
        disableScrollLock={true}
        id="fade-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-mobile',
        }}
        sx={{
          '& .MuiMenu-root': {},
          '& .MuiMenu-paper': {
            padding: '8px 16px 16px 16px',
            height: '164px',
            width: '330px',
            position: 'absolute',
            background: isLight ? '#FFFFFF' : '#000A13',
            boxShadow: isLight
              ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
              : ' 0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
            border: isLight ? 'none' : '1px solid #10191F',
            marginTop: '-3px',
          },
          '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
            borderRadius: '6px',
          },
          '& .MuiMenu-list': {
            paddingRight: '16px',
            paddingLeft: '16px',
            paddingTop: '8px',
            paddingBottom: '8px',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items?.map((item, i: number) => (
          <MenuItem
            disableGutters={true}
            disableTouchRipple={true}
            style={item.style}
            sx={{
              paddingTop: '0px',
              paddingBottom: '0px',
              minHeight: 'fit-content',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              letterSpacing: '0.4px',
              color: isLight ? '#708390' : '#48495F',
              marginBottom: '32px',
              '&:last-child': {
                marginBottom: '0px',
              },
            }}
            key={`key-${i}`}
          >
            <Link
              href={item.url}
              passHref
              style={{
                pointerEvents: item.url ? 'all' : 'none',
              }}
              legacyBehavior
            >
              <ItemMenu onClick={handleClose}>{item.label}</ItemMenu>
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <StyleTitle>{title}</StyleTitle>
    </Container>
  );
};

const StyleTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '11px',
  lineHeight: '13px',
  textAlign: 'center',
  color: theme.palette.mode === 'light' ? '#231536' : '#E2D8EE',
  marginLeft: 8,
}));

const ItemMenu = styled('a')({
  textDecoration: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const ArrowBackIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : '#343442'}`,
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#10191F',
  marginRight: 8,
  padding: 0,
}));

export default BreadCrumbWithIcons;
