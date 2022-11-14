import styled from '@emotion/styled';
import { ThemeMode } from '../../../core/context/ThemeContext';
import MoonMode from '../svg/theme-mode';
import ToggleDarkMode from '../svg/toggle-dark';

interface Props {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const SwitcherButton = ({ themeMode, toggleTheme }: Props) => {
  return (
    <MainContainer onClick={toggleTheme}>
      {themeMode === 'light' ? (
        <Container>
          <MoonMode width={18} height={18} />
          <Label>Dark Mode</Label>
        </Container>
      ) : (
        <Container>
          <ToggleDarkMode width={18} height={18} />
          <Label>Light Mode</Label>
        </Container>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div({
  width: 'fit-content',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
  width: 'fit-content',
});

const Label = styled.p({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  alignItems: 'center',
  letterSpacing: '0.3px',
  color: '#231536',
  marginLeft: 11,
  marginTop: 0,
  marginBottom: 0,
});

export default SwitcherButton;
