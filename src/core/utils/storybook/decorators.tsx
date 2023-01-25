import styled from '@emotion/styled';
import PermissionManager from '@ses/core/auth/permission-manager';
import { AuthContext } from '@ses/core/context/AuthContext';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { ThemeProvider } from '@ses/core/context/ThemeContext';
import type { CoreUnitContextValues } from '@ses/core/context/CoreUnitContext';
import type { UserDTO } from '@ses/core/models/dto/auth.dto';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';
import type { Story } from '@storybook/react';

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

export const withThemeContext = (isLight: boolean) => (Story: Story) =>
  (
    <ThemeProvider isLightApp={isLight}>
      <TemplateThemeWrapper isLight={isLight}>
        <Story />
      </TemplateThemeWrapper>
    </ThemeProvider>
  );

const TemplateThemeWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));
