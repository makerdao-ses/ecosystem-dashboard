import styled from '@emotion/styled';
import PermissionManager from '@ses/core/auth/permissionManager';
import { AuthContext } from '@ses/core/context/AuthContext';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { ThemeProvider } from '@ses/core/context/ThemeContext';
import type { CoreUnitContextValues } from '@ses/core/context/CoreUnitContext';
import type { UserDTO } from '@ses/core/models/dto/authDTO';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { Story } from '@storybook/react';
import type { PropsWithChildren } from 'react';

export const withUserLoggedIn = (user: UserDTO) => (Story: Story) =>
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

export const withCoreUnitContext = (CuOrStory: Story | CoreUnitDto) => {
  if (typeof CuOrStory === 'function') {
    // it is a Story
    return (
      <CoreUnitContext.Provider
        value={
          {
            currentCoreUnit: { shortCode: 'EXA' },
          } as CoreUnitContextValues
        }
      >
        <CuOrStory />
      </CoreUnitContext.Provider>
    );
  } else {
    // it is a Core Unit instance
    return (Story: Story) => (
      <CoreUnitContext.Provider
        value={
          {
            currentCoreUnit: CuOrStory,
          } as CoreUnitContextValues
        }
      >
        <Story />
      </CoreUnitContext.Provider>
    );
  }
};

export const withThemeContext =
  (isLight: boolean, useBackground = true) =>
  (Story: Story) => {
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

export const withWrappedStyles = (styles: React.CSSProperties) => (Story: Story) =>
  (
    <div style={styles}>
      <Story />
    </div>
  );

export const withoutSBPadding = (Story: Story) => withWrappedStyles({ margin: '-1rem' })(Story);

export const withFixedPositionRelative = (Story: Story) => withWrappedStyles({ transform: 'translateZ(0)' })(Story);
