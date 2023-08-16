import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransitionHeaderProps {
  from: string | string[];
  to: string | string[];
}

const TransitionHeader: React.FC<TransitionHeaderProps> = ({ from, to }) => {
  const { isLight } = useThemeContext();

  return (
    <HeaderContainer>
      <From isLight={isLight}>{renderItems(from, isLight)}</From>
      <To isLight={isLight}>{renderItems(to, isLight)}</To>
    </HeaderContainer>
  );
};

export default TransitionHeader;

const renderItems = (from: string | string[], isLight: boolean) => {
  if (Array.isArray(from)) {
    return (
      <List>
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

const HeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    borderRadius: 6,
    background: 'rgba(236, 239, 249, 0.30)',
    boxShadow: 'none',
  },
});

const From = styled.div<WithIsLight>(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'url("/assets/img/endgame/arrow_mobile_light.png")',
  backgroundSize: '100% 82px',
  backgroundRepeat: 'no-repeat',
  filter: 'drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25)) drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.40))',
  minHeight: 82,
  paddingBottom: 18,

  [lightTheme.breakpoints.up('table_834')]: {
    backgroundImage: 'url("/assets/img/endgame/arrow_desktop_light.png")',
    backgroundSize: 'calc(100% + 15px) 100%',
    backgroundRepeat: 'no-repeat',
    minHeight: 87,
    paddingLeft: 32,
    paddingRight: 86,
    width: 'calc(50% + 140px)',
  },
}));

const To = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: -32,
  paddingTop: 31,
  background: isLight ? '#F5F6FC' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
    width: '50%',
    justifyContent: 'center',
  },
}));

const List = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingLeft: 20,
  marginLeft: 'auto',
  marginRight: 'auto',

  '& li': {
    textAlign: 'left',
  },
});

const Item = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  color: isLight ? '#708390' : 'red',
  width: '100%',
  textAlign: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '19px',
  },
}));
