import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import styled from '@emotion/styled';
import { ThemeMode } from '../../../core/context/ThemeContext';

interface HeaderWrapperProps {
  children?: JSX.Element | JSX.Element[];
  themeMode: ThemeMode
  toggleTheme: () => void
}
export const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  return (
    < Container >
      <CssBaseline />
      {children}
    </Container >
  );
};

const Container = styled.div({
  display: 'flex',
  background: 'white',
});
