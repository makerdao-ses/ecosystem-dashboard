import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';
import ThereDots from '../svg/there-dots';
import ThreeDotsWithCircleGreen from '../svg/three-dots-circle-green';

interface Props {
  title: string;
  items: {
    label: string | JSX.Element;
    url: string;
    style?: React.CSSProperties;
  }[];
  className?: string;
  marginRightSeparator?: string;
  hasIcon?: boolean;
}

const BreadCrumbWithIcons = ({ title, items = [], className, marginRightSeparator = '4px', hasIcon = true }: Props) => {
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
        <IconButton
          sx={{
            marginRight: '8px',
            padding: '0px',
          }}
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {open ? (
            <ThreeDotsWithCircleGreen
              fill={isLight ? '#B6EDE7' : '#1E2C37'}
              fillThereDots={isLight ? '#1AAB9B' : '#02CB9B'}
            />
          ) : (
            <ThereDots width={12} fill={isLight ? '#231536' : '#D2D4EF'} height={3} />
          )}
        </IconButton>
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
              <ItemMenu>{item.label}</ItemMenu>
            </Link>
          </MenuItem>
        ))}
      </Menu>
      {items.length >= 1 && hasIcon && (
        <BreadcrumbSeparator
          style={{ marginRight: marginRightSeparator }}
          width={5}
          height={10}
          fill="#D1DEE6"
          fillDark="#9FAFB9"
        />
      )}
      <StyleTitle isLight={isLight}>{title}</StyleTitle>
    </Container>
  );
};

const StyleTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: '13px',
    textAlign: 'center',
    color: isLight ? '#231536' : '#E2D8EE',
  })
);

const ItemMenu = styled.a({
  textDecoration: 'none',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export default BreadCrumbWithIcons;
