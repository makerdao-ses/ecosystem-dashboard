import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useThemeContext } from '../src/core/context/ThemeContext';
import CardNotFoundPage from '../src/stories/components/404/not-found-component-404';
import lightTheme from '../styles/theme/light';

const NotFoundPage: NextPage = () => {
  const { isLight } = useThemeContext();

  return (
    <Container isLight={isLight}>
      <CardNotFoundPage />
    </Container>
  );
};

const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'right 30% bottom 70%',
  [lightTheme.breakpoints.up('table_375')]: {
    // TODO: Find a better way to hidden line
    marginBottom: '-1px',
  },
}));

export default NotFoundPage;
