import React from 'react';
import { withThemeContext } from './decorators';
import type { StoryObj } from '@storybook/react';
import type { ElementType } from 'react';

export const createThemeModeVariants = (
  Component: ElementType,
  args?: { [key: keyof React.ComponentProps<typeof Component>]: unknown }[] | number,
  useBackground = true
) => {
  let normalizedArgs = [{}];
  if (typeof args === 'number') {
    normalizedArgs = Array.from({ length: args }, () => ({}));
  } else if (args) {
    normalizedArgs = args;
  }

  type Story = StoryObj<React.ComponentProps<typeof Component>>;

  const render = (args: unknown) => <Component {...(args as React.ComponentProps<typeof Component>)} />;

  const components: Story[][] = [];
  for (const currentArgs of normalizedArgs) {
    const lightVariant: Story = {
      args: currentArgs,
      decorators: [withThemeContext(true, useBackground)],
      render,
    };
    lightVariant.decorators = [withThemeContext(true, useBackground)];

    const darkVariant: Story = {
      args: currentArgs,
      decorators: [withThemeContext(false, useBackground)],
      render,
    };
    components.push([lightVariant, darkVariant]);
  }
  return components;
};
