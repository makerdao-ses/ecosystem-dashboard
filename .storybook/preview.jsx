import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12
import { WithNextRouter } from 'storybook-addon-next-router/dist/decorators';
import { mockDateDecorator } from 'storybook-mock-date-decorator';
import '../styles/globals.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  viewport: {
    viewports: {
      tablet_375: {
        name: 'tablet_375',
        styles: {
          width: '375px',
          height: '100%',
        },
        type: 'mobile',
      },
      tablet_834: {
        name: 'tablet_834',
        styles: {
          width: '834px',
          height: '100%',
        },
        type: 'tablet',
      },
      desktop_1194: {
        name: 'desktop_1194',
        styles: {
          width: '1194px',
          height: '100%',
        },
        type: 'tablet',
      },
      desktop_1280: {
        name: 'desktop_1280',
        styles: {
          width: '1280px',
          height: '100%',
        },
        type: 'desktop',
      },
      desktop_1440: {
        name: 'desktop_1440',
        styles: {
          width: '1440px',
          height: '100%',
        },
        type: 'desktop',
      },
      desktop_1920: {
        name: 'desktop_1920',
        styles: {
          width: '1920px',
          height: '100%',
        },
        type: 'desktop',
      },
    },
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
};

export const decorators = [WithNextRouter, mockDateDecorator];
