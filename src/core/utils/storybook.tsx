import React from 'react';
import PermissionManager from '../auth/permission-manager';
import { AuthContext } from '../context/AuthContext';
import { CoreUnitContext } from '../context/CoreUnitContext';
import { ThemeProvider } from '../context/ThemeContext';
import type { CoreUnitContextValues } from '../context/CoreUnitContext';
import type { UserDTO } from '../models/dto/auth.dto';
import type { CoreUnitDto } from '../models/dto/core-unit.dto';
import type { Story } from '@storybook/react';
import type { ComponentProps, ElementType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTemplateWithTheme =
  <T extends React.ComponentType<any>>(Component: ElementType, isLight = true): Story<ComponentProps<T>> =>
  (args: ComponentProps<typeof Component>) =>
    (
      <ThemeProvider isLightApp={isLight}>
        <div
          style={{
            padding: 20,
            background: isLight ? '#FFFFFF' : '#000000',
            backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}
        >
          <Component {...(args as object)} />
        </div>
      </ThemeProvider>
    );

export const createThemeModeVariants = (
  Component: ElementType,
  args?: { [key: keyof React.ComponentProps<typeof Component>]: unknown }[] | number
) => {
  const lightTemplate = createTemplateWithTheme(Component);
  const darkTemplate = createTemplateWithTheme(Component, false);

  let normalizedArgs = [{}];
  if (typeof args === 'number') {
    normalizedArgs = Array.from({ length: args }, () => ({}));
  } else if (args) {
    normalizedArgs = args;
  }

  const components = [];
  for (const currentArgs of normalizedArgs) {
    const lightVariant = lightTemplate.bind({});
    lightVariant.args = currentArgs;

    const darkVariant = darkTemplate.bind({});
    darkVariant.args = currentArgs;
    components.push([lightVariant, darkVariant]);
  }
  return components;
};

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
