import { styled } from '@mui/material';
import React from 'react';

interface PageBackgroundProps extends React.PropsWithChildren {
  className?: string;
  hasImageBackground?: boolean; // for legacy compatibility
}

const PageContainer: React.FC<PageBackgroundProps> = ({ children, className, hasImageBackground = false }) => (
  <PageBackground className={className} hasImageBackground={hasImageBackground}>
    {children}
  </PageBackground>
);

export default PageContainer;

const PageBackground = styled('div')<{ hasImageBackground: boolean }>(({ theme, hasImageBackground }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#1B1E24',
  paddingTop: 64, // set below the header height
  paddingBottom: 64,
  width: '100%',

  ...(hasImageBackground && {
    backgroundColor: theme.palette.isLight ? '#FFFFFF' : '#000000',
    backgroundImage: theme.palette.isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  }),
  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 98, // set below the header height
  },
  [theme.breakpoints.up('desktop_1920')]: {
    borderBottom: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.gray[900]
    }`,
  },
}));
