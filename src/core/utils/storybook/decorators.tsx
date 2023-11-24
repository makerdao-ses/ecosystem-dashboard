import styled from '@emotion/styled';
import PermissionManager from '@ses/core/auth/permissionManager';
import { AuthContext } from '@ses/core/context/AuthContext';
import { TeamContext } from '@ses/core/context/TeamContext';
import { ThemeProvider } from '@ses/core/context/ThemeContext';
import type { TeamContextValues } from '@ses/core/context/TeamContext';
import type { Team } from '@ses/core/models/interfaces/team';
import type { User } from '@ses/core/models/interfaces/users';
import type { StoryFn } from '@storybook/react';
import type { PropsWithChildren } from 'react';

export const withUserLoggedIn = (user: User) => (Story: StoryFn) =>
  (
    <AuthContext.Provider
      value={{
        hasToken: true,
        authToken: 'mockedAuth',
        permissionManager: new PermissionManager(user),
      }}
    >
      <Story />
    </AuthContext.Provider>
  );

export const withGenericTeamContext = (Story: StoryFn) => (
  <TeamContext.Provider
    value={
      {
        currentTeam: { shortCode: 'EXA' },
      } as TeamContextValues
    }
  >
    <Story />
  </TeamContext.Provider>
);

export const withTeamContext = (CuOrStory: Team) => (Story: StoryFn) =>
  (
    <TeamContext.Provider
      value={{
        currentTeam: CuOrStory,
        setCurrentTeam: () => null,
      }}
    >
      <Story />
    </TeamContext.Provider>
  );

export const withThemeContext =
  (isLight: boolean, useBackground = true) =>
  (Story: StoryFn) => {
    const Background = useBackground ? TemplateThemeWrapper : ({ children }: PropsWithChildren) => <>{children}</>;
    return (
      <ThemeProvider isLightApp={isLight}>
        <Background isLight={isLight}>
          <Story />
        </Background>
      </ThemeProvider>
    );
  };

const TemplateThemeWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

export const withWrappedStyles = (styles: React.CSSProperties) => (Story: StoryFn) =>
  (
    <div style={styles}>
      <Story />
    </div>
  );

export const withoutSBPadding = (Story: StoryFn) => withWrappedStyles({ margin: '-1rem' })(Story);

export const withFixedPositionRelative = (Story: StoryFn) => withWrappedStyles({ transform: 'translateZ(0)' })(Story);

const Container = styled.div({
  '& div:first-of-type': {
    top: 0,
  },
});

export const withoutMarginTopInFixedPosition = (Story: StoryFn) => (
  <Container>
    <Story />
  </Container>
);
