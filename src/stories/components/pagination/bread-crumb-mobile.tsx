import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import ArrowMobileLeft from '../svg/ArrowMobileLeft';
import ArrowMobileRight from '../svg/ArrowMobileRight';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';
import ThereDots from '../svg/there-dots';
import ThreeDotsWithCircleGreen from '../svg/three-dots-circle-green';

interface Props {
  title: string;
  count?: number;
  page?: number;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  items: {
    label: string | JSX.Element;
    url: string;
    style?: React.CSSProperties;
  }[];
}

const BreadCrumbMobile = ({ title, count = 0, page = 0, onClickLeft, onClickRight, items = [] }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container isLight={isLight}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
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
          {' '}
          {open ? (
            <ThreeDotsWithCircleGreen
              fill={isLight ? '#B6EDE7' : '#1E2C37'}
              fillThereDots={isLight ? '#1AAB9B' : '#02CB9B'}
            />
          ) : (
            <ThereDots width={12} fill={isLight ? '#231536' : '#D2D4EF'} height={3} />
          )}
        </IconButton>
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
          {items?.map((item, i: number) => {
            return (
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
                  style={{
                    pointerEvents: item.url ? 'all' : 'none',
                  }}
                >
                  {item.label}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
        <BreadcrumbSeparator style={{ marginRight: '4px' }} width={5} height={10} fill="#D1DEE6" fillDark="#9FAFB9" />
        <StyleTitle isLight={isLight}>{title}</StyleTitle>
      </div>
      <RightPart>
        <PaginationLabel>
          <StyleActualCoreUnit isLight={isLight}>{`${page}`}</StyleActualCoreUnit>
          <StyleTextCoreUnit isLight={isLight}>{` of ${count}`} </StyleTextCoreUnit>
        </PaginationLabel>
        <Arrows>
          <ArrowMobileLeft
            onClick={onClickLeft}
            width={6}
            height={10}
            fill={page !== 1 ? undefined : '#d1dee6'}
            disabled={page === 1}
          />
          <ArrowMobileRight
            onClick={onClickRight}
            width={5}
            height={10}
            fill={page !== count ? undefined : '#d1dee6'}
            disabled={page === count}
          />
        </Arrows>
      </RightPart>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '32px',
  padding: '8px',
  background: isLight ? '#ECF1F3' : '#000A13',
  borderRadius: '6px',
}));
const RightPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
});

const PaginationLabel = styled.div({
  height: '23px',
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  borderRadius: '8px',
  marginRight: '7px',
  alignItems: 'center',
  whiteSpace: 'break-spaces',
});

const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '19px',
  alignItems: 'center',
});

const StyleActualCoreUnit = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '10px',
  lineHeight: '20px',
  letterSpacing: 'none',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const StyleTextCoreUnit = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '20px',
    color: isLight ? '#626472' : '#546978',
  })
);

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

export default BreadCrumbMobile;
