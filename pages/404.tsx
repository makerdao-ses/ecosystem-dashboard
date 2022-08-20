import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useThemeContext } from '../src/core/context/ThemeContext';
import CardNotFoundPage from '../src/stories/components/404/CardNotFoundPage';

const NotFoundPage: NextPage = () => {
  const isLight = useThemeContext().themeMode === 'light';

  return <Container isLight={isLight}>
    <CardNotFoundPage />
  </Container>;
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
}));

export default NotFoundPage;
