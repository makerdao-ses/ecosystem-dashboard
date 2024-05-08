import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransitionHeaderProps {
  from: string | string[];
  to: string | string[];
}

const TransitionHeader: React.FC<TransitionHeaderProps> = ({ from, to }) => {
  const { isLight } = useThemeContext();

  return (
    <HeaderContainer isLight={isLight}>
      <From isLight={isLight}>{renderItems(from, isLight)}</From>
      <To isLight={isLight}>{renderItems(to, isLight)}</To>
    </HeaderContainer>
  );
};

export default TransitionHeader;

const renderItems = (from: string | string[], isLight: boolean) => {
  if (Array.isArray(from)) {
    return (
      <List isLight={isLight}>
        {from.map((item, index) => (
          <Item as={'li'} key={index} isLight={isLight}>
            {item}
          </Item>
        ))}
      </List>
    );
  } else {
    return <Item isLight={isLight}>{from}</Item>;
  }
};

const HeaderContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 5px 10px 0px rgba(7, 22, 40, 0.40)',
  borderRadius: 6,
  overflow: 'hidden',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    background: isLight ? 'rgba(236, 239, 249, 0.30)' : '#343442',
    boxShadow: 'none',
  },
}));

const From = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url("/assets/img/endgame/arrow_mobile_${isLight ? 'light' : 'dark'}.png")`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  filter: isLight
    ? 'drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25)) drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.40))'
    : 'drop-shadow(0px 1px 3px rgba(30, 23, 23, 0.25)) drop-shadow(0px 20px 40px rgba(7, 22, 40, 0.40))',
  minHeight: 82,
  paddingBottom: 18,

  '& > ul': {
    marginBottom: 23,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    backgroundImage: `url("/assets/img/endgame/arrow_desktop_${isLight ? 'light' : 'dark'}.png")`,
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

const To = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -42,
  paddingTop: 41,
  background: isLight ? '#F5F6FC' : '#343442',

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

const List = styled.ul<WithIsLight>(({ isLight }) => ({
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
      background: isLight ? '#708390' : '#E2D8EE',
      position: 'absolute',
      left: 8,
      marginTop: 8,

      [lightTheme.breakpoints.up('tablet_768')]: {
        width: 5,
        height: 5,
        left: 5,
      },
    },

    [lightTheme.breakpoints.up('desktop_1280')]: {
      whiteSpace: 'nowrap',
    },
  },
}));

const Item = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  color: isLight ? '#708390' : '#E2D8EE',
  width: '100%',
  textAlign: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '19px',
  },
}));
