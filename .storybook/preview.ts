import { mockDateDecorator } from 'storybook-mock-date-decorator';
import type { Preview } from '@storybook/react';

// apply global styles to each story
import '../styles/globals.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    date: new Date('2024-01-01T00:00:00Z'),
    viewport: {
      viewports: {
        mobile_375: {
          name: 'mobile_375',
          styles: {
            width: '375px',
            height: '100%',
          },
          type: 'mobile',
        },
        tablet_768: {
          name: 'tablet_768',
          styles: {
            width: '768px',
            height: '100%',
          },
          type: 'tablet',
        },
        desktop_1024: {
          name: 'desktop_1024',
          styles: {
            width: '1024px',
            height: '100%',
          },
          type: 'desktop',
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
        tablet_834: {
          name: 'Legacy_tablet_834',
          styles: {
            width: '834px',
            height: '100%',
          },
          type: 'tablet',
        },
        desktop_1194: {
          name: 'Legacy_desktop_1194',
          styles: {
            width: '1194px',
            height: '100%',
          },
          type: 'tablet',
        },
      },
    },
  },
};

export default preview;

export const decorators = [mockDateDecorator];
