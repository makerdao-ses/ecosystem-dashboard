import styled from '@emotion/styled';
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
    <Container isLight={isLight}>
      <SwitcherButton themeMode={themeMode} toggleTheme={toggleTheme} />
      <Line isLight={isLight} />
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
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  borderRadius: '6px',
  padding: '16px',
  width: 267,
}));

const Line = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  border: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  marginBottom: 24,
  marginTop: 24,
}));

export default MenuItemTheme;
