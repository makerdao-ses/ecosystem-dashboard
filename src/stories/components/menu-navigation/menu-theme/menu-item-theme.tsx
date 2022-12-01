import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ThemeType } from '../../../../core/enums/theme.enum';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../../core/utils/const';
import { CustomLink } from '../../custom-link/custom-link';
import SwitcherButton from '../swtich-buttom';

interface Props {
  toggleTheme: () => void;
  themeMode: ThemeType;
}

export const MenuItemTheme = ({ themeMode, toggleTheme }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <ItemMenu isLight={isLight}>
        <SwitcherButton themeMode={themeMode} toggleTheme={toggleTheme} />
      </ItemMenu>
      <Divider
        light
        sx={{
          bgcolor: isLight ? '#D4D9E1' : '#405361',
          marginBottom: '14px',
          marginTop: '14px',
          height: '1px',
        }}
        variant="fullWidth"
      />
      <ItemMenu isLight={isLight}>
        <CustomLink
          children="How to Submit Expenses"
          fontWeight={500}
          fontSize={16}
          href={HOW_TO_SUBMIT_EXPENSES}
          style={{
            fontFamily: 'Inter, sans serif',
            color: '#447AFB',
            fontStyle: 'normal',
            letterSpacing: '0.3px',
            marginLeft: '0px',
          }}
          marginLeft="7px"
          withArrow
          iconHeight={10}
          iconWidth={10}
        />
      </ItemMenu>
    </Container>
  );
};

const Container = styled.div({
  borderRadius: '6px',
  padding: '16px',
  width: 267,
});

const ItemMenu = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 40,
  paddingLeft: 8,
  paddingBottom: 8,
  paddingTop: 8,
  cursor: 'pointer',
  ':last-child': {
    marginBottom: 0,
  },
  ':hover': {
    backgroundColor: isLight ? '#EDEFFF' : '#25273D',
    borderRadius: '6px',
    paddingLeft: 8,
    paddingBottom: 8,
    paddingTop: 8,
    height: 40,
  },
}));

export default MenuItemTheme;
