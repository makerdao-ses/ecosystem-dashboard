import { RecognizedDelegatesBuilder } from '@ses/core/businessLogic/builders/recognizedDelegatesBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import RecognizedDelegatesContainer from './RecognizedDelegatesContainer';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Recognized Delegates',
  component: RecognizedDelegatesContainer,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/delegates',
    },
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof RecognizedDelegatesContainer>;

const variantsArgs = [
  {
    delegates: [
      new RecognizedDelegatesBuilder()
        .withName('Flip Flop Flap Delegate LLC')
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(2325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('GFX Labs')
        .withImage('https://live.staticflickr.com/65535/52832350651_0506c1ff2a_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(2325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('Coldirion.eth')
        .withImage('https://live.staticflickr.com/65535/52832350671_ac70b94b13_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(2325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('Feedblack Loops LLC')
        .withImage('https://live.staticflickr.com/65535/52832796763_a0e2339b3b_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(2325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
    ],
    totalDaiDelegates: 2130885,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <RecognizedDelegatesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:207820&t=jLRG7vNdHbvDtBzQ-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: '375px',
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:198497&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
        },
        componentStyle: {
          width: '834px',
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:195841&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
        },
        componentStyle: {
          width: '1194px',
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:193184&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
        },
        componentStyle: {
          width: '1280px',
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:189758&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
        },
        componentStyle: {
          width: '1440px',
        },
      },
    },
  } as FigmaParams,
};
