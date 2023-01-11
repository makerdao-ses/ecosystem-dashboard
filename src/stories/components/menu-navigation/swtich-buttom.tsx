import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import MoonMode from '../svg/theme-mode';
import ToggleDarkMode from '../svg/toggle-dark';
import type { ThemeMode } from '../../../core/context/ThemeContext';

interface Props {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const SwitcherButton = ({ themeMode, toggleTheme }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <MainContainer onClick={toggleTheme}>
      {themeMode === 'light' ? (
        <Container>
          <MoonMode width={18} height={18} />
          <Label isLight={isLight}>Dark Mode</Label>
        </Container>
      ) : (
        <Container>
          <ToggleDarkMode width={18} height={18} />
          <Label isLight={isLight}>Light Mode</Label>
        </Container>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div({
  width: '100%',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
});

const Label = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  alignItems: 'center',
  letterSpacing: '0.3px',
  color: isLight ? '#231536' : '#EDEFFF',
  marginLeft: 11,
  marginTop: 0,
  marginBottom: 0,
}));

export default SwitcherButton;
