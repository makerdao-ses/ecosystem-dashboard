import React from 'react';
import { withThemeContext } from './decorators';
import type { Story } from '@storybook/react';
import type { ElementType } from 'react';

export const createThemeModeVariants = (
  Component: ElementType,
  args?: { [key: keyof React.ComponentProps<typeof Component>]: unknown }[] | number,
  useBackground = true
) => {
  const Template: Story = (args) => <Component {...args} />;

  let normalizedArgs = [{}];
  if (typeof args === 'number') {
    normalizedArgs = Array.from({ length: args }, () => ({}));
  } else if (args) {
    normalizedArgs = args;
  }

  const components = [];
  for (const currentArgs of normalizedArgs) {
    const lightVariant = Template.bind({});
    lightVariant.args = currentArgs;
    lightVariant.decorators = [withThemeContext(true, useBackground)];

    const darkVariant = Template.bind({});
    darkVariant.args = currentArgs;
    darkVariant.decorators = [withThemeContext(false, useBackground)];
    components.push([lightVariant, darkVariant]);
  }
  return components;
};
