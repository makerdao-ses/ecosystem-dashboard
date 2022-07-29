import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
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
    label: string | JSX.Element,
    url: string,
    style?: React.CSSProperties,
  }[];
}

const BreadCrumbMobile = ({ title, count = 0, page = 0, onClickLeft, onClickRight, items = [] }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
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
        > {open
          ? <ThreeDotsWithCircleGreen />
          : <ThereDots width={12}
            height={3} />}</IconButton>
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
            '& .MuiMenu-root': {
            },
            '& .MuiMenu-paper': {
              padding: '8px 16px 16px 16px',
              height: '164px',
              width: '330px',
              position: 'absolute',
              background: '#FFFFFF',
              boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
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
            return <MenuItem
              disableGutters={true}
              disableTouchRipple={true}
              style={item.style}
              sx={{
                paddingTop: '0px',
                paddingBottom: '0px',
                minHeight: 'fit-content',
                fontFamily: 'FT Base, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                letterSpacing: '0.4px',
                color: '#708390',
                marginBottom: '32px',
                '&:last-child': {
                  marginBottom: '0px',
                },
              }}
              key={`key-${i}`}>
              <Link href={item.url} style={{
                pointerEvents: item.url ? 'all' : 'none',
              }}>
                {item.label}
              </Link>

            </MenuItem >;
          })}
        </Menu>
        <BreadcrumbSeparator style={{ marginRight: '4px' }} width={5} height={10} fill='#D1DEE6' />
        <StyleTitle>{title}</StyleTitle>
      </div>
      <RightPart>
        <PaginationLabel>
          <StyleActualCoreUnit >{`${page}`}</StyleActualCoreUnit>
          <StyleTextCoreUnit>{` of ${count}`} </StyleTextCoreUnit>
        </PaginationLabel>
        <Arrows>
          <ArrowMobileLeft onClick={onClickLeft} width={6} height={10} style={{
            marginRight: '4px'
          }} />
          <ArrowMobileRight onClick={onClickRight} width={5} height={10} /></Arrows>
      </RightPart>
    </Container >
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '32px',
  padding: '8px',
  background: '#ECF1F3',
  borderRadius: '6px',
});
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
  alignItems: 'center',
});

const StyleActualCoreUnit = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '24px',
  letterSpacing: 'none',
  color: '#231536',
});

const StyleTextCoreUnit = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '24px',
  color: '#626472',
});

const StyleTitle = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  textAlign: 'center',
  color: '#231536'
});

export default BreadCrumbMobile;
