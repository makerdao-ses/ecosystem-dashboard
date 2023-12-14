import { RecognizedDelegatesBuilder } from '@ses/core/businessLogic/builders/recognizedDelegatesBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import RecognizedDelegatesContainer from './RecognizedDelegatesContainer';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof RecognizedDelegatesContainer> = {
  title: 'Pages/Recognized Delegates',
  component: RecognizedDelegatesContainer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/delegates',
      },
    },
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    delegates: [
      new RecognizedDelegatesBuilder()
        .withName('Feedblack Loops LLC')
        .withImage('https://live.staticflickr.com/65535/52832796763_a0e2339b3b_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(23325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('Flip Flop Flap Delegate LLC')
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(292325)
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
        .withNumberDai(282325)
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
        .withNumberDai(272325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
    ],
    totalMakerDAOExpenses: 1493489,
    monthlyAnalytics: {
      series: [
        {
          rows: [],
        },
      ],
    },
    totalAnalytics: {
      series: [
        {
          rows: [],
        },
      ],
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <RecognizedDelegatesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };

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
          componentStyle: {
            width: '834px',
          },
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
          componentStyle: {
            width: '1194px',
          },
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
          componentStyle: {
            width: '1280px',
          },
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
          componentStyle: {
            width: '1440px',
          },
        },
      },
    },
  } as FigmaParams,
};
