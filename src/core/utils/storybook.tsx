import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import type { ComponentProps, ElementType } from 'react';
import type { Story } from '@storybook/react';
import { CoreUnitContext, CoreUnitContextValues } from '../context/CoreUnitContext';
import { CoreUnitDto } from '../models/dto/core-unit.dto';
import { AuthContext } from '../context/AuthContext';
import PermissionManager from '../auth/permission-manager';
import { UserDTO } from '../models/dto/auth.dto';
import FigmaComparator from '../../stories/helpers/FigmaComparator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTemplateWithTheme = <T extends React.ComponentType<any>>(
  Component: ElementType,
  isLight = true
): Story<ComponentProps<T>> => {
  return (args: ComponentProps<typeof Component>) => {
    return (
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
  };
};

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

export const withUserLoggedIn = (user: UserDTO) => {
  return (Story: Story) => (
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
};

export const withFigmaComparator = (fileId: string, nodeId: string) => (Story: Story) =>
  (
    <FigmaComparator fileId={fileId} nodeId={nodeId}>
      <Story />
    </FigmaComparator>
  );
