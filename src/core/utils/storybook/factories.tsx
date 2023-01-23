/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import React from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import type { Story } from '@storybook/react';
import type { ComponentProps, ElementType } from 'react';

export const createTemplateWithTheme =
  <T extends React.ComponentType<any>>(Component: ElementType, isLight = true): Story<ComponentProps<T>> =>
  (args: ComponentProps<typeof Component>) =>
    (
      <ThemeProvider isLightApp={isLight}>
        <TemplateThemeWrapper isLight={isLight}>
          <Component {...(args as object)} />
        </TemplateThemeWrapper>
      </ThemeProvider>
    );

const TemplateThemeWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

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
