import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface PageBackgroundProps extends React.PropsWithChildren {
  className?: string;
  hasImageBackground?: boolean;
}

const PageContainer: React.FC<PageBackgroundProps> = ({ children, className, hasImageBackground = false }) => {
  const { isLight } = useThemeContext();

  return (
    <PageBackground isLight={isLight} className={className} hasImageBackground={hasImageBackground}>
      {children}
    </PageBackground>
  );
};

export default PageContainer;

const PageBackground = styled.div<WithIsLight & { hasImageBackground: boolean }>(({ isLight, hasImageBackground }) => ({
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  paddingTop: '64px', // set below the header height
  paddingBottom: '128px',
  width: '100%',

  ...(hasImageBackground && {
    backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  }),
}));
