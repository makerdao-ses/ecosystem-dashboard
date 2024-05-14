import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

interface TransitionHeaderProps {
  from: string | string[];
  to: string | string[];
}

const TransitionHeader: React.FC<TransitionHeaderProps> = ({ from, to }) => (
  <HeaderContainer>
    <From>{renderItems(from)}</From>
    <To>{renderItems(to)}</To>
  </HeaderContainer>
);

export default TransitionHeader;

const renderItems = (from: string | string[]) => {
  if (Array.isArray(from)) {
    return (
      <List>
        {from.map((item, index) => (
          <Item as={'li'} key={index}>
            {item}
          </Item>
        ))}
      </List>
    );
  } else {
    return <Item>{from}</Item>;
  }
};

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  borderRadius: 12,
  overflow: 'hidden',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],
  },
}));

const From = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url("/assets/img/endgame/arrow_mobile_${theme.palette.mode}.png")`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  filter: theme.palette.isLight
    ? 'drop-shadow(0px 1px 5px rgba(190, 190, 190, 0.25)) drop-shadow(0px 20px 20px rgba(219, 227, 237, 0.4))'
    : 'drop-shadow(0px 1px 3px rgba(30, 23, 23, 0.25)) drop-shadow(0px 20px 40px rgba(7, 22, 40, 0.40))',
  minHeight: 82,
  paddingBottom: 18,

  '& li:before': {
    background: theme.palette.colors.slate[100],
  },

  '& li, & div': {
    color: theme.palette.colors.slate[100],
  },

  '& > ul': {
    marginBottom: 23,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    backgroundImage: `url("/assets/img/endgame/arrow_desktop_${theme.palette.mode}.png")`,
    backgroundSize: 'calc(100% + 22px) 100%',
    backgroundRepeat: 'no-repeat',
    minHeight: 87,
    paddingLeft: 32,
    paddingRight: 112,
    paddingBottom: 0,
    width: 'calc(50% + 140px)',
    filter: 'none',

    '& > ul': {
      marginBottom: 16,
      marginLeft: 4,
    },
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    backgroundSize: 'calc(100% + 15px) 100%',
    paddingRight: 131,
    width: 'calc(50% + 140px)',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingRight: 75,
    width: 'calc(50% + 89px)',
  },
}));

const To = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -42,
  paddingTop: 41,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],

  '& li:before': {
    background: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  },

  '& li, & div': {
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  },

  '& > div': {
    padding: '16px 0',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: '50%',
    marginTop: 0,
    paddingTop: 0,
    background: 'none',

    '& > div': {
      paddingRight: 20,
    },

    '& > ul': {
      gap: 16,
      marginLeft: -50,
    },
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    '& > ul': {
      marginLeft: -18,
    },
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingRight: 12,
  },
}));

const List = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingLeft: 20,
  listStyle: 'none',
  position: 'relative',

  '& li': {
    textAlign: 'left',

    '&::before': {
      content: '""',
      display: 'block',
      width: 4,
      height: 4,
      borderRadius: 8,
      position: 'absolute',
      left: 8,
      marginTop: 8,

      [theme.breakpoints.up('tablet_768')]: {
        width: 5,
        height: 5,
        left: 5,
      },
    },

    [theme.breakpoints.up('desktop_1280')]: {
      whiteSpace: 'nowrap',
    },
  },
}));

const Item = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 700,
  width: '100%',
  textAlign: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));
