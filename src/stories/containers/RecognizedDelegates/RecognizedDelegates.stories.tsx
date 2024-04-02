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
        pathname: '/recognized-delegates',
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
        .withImage('https://forum.makerdao.com/user_avatar/forum.makerdao.com/twblack88/90/16125_2.png')
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
        .withName('Flip Flap Flop Delegate LLC')
        .withImage('https://forum.makerdao.com/user_avatar/forum.makerdao.com/flipflopflapdelegate/90/24350_2.png')
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
        .withImage('https://forum.makerdao.com/user_avatar/forum.makerdao.com/gfxlabs/90/13005_2.png')
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
        .withName('Coldiron.eth')
        .withImage('https://forum.makerdao.com/user_avatar/forum.makerdao.com/coldiron.eth/240/25270_2.png')
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
    totalMakerDAOExpenses: 33000000,
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
          period: 'total',
          start: '2021-11-01T00:00:00.000Z',
          end: '2023-04-01T00:00:00.000Z',
          rows: [
            {
              dimensions: [
                {
                  path: 'atlas/legacy/recognized-delegates/*/*',
                  name: 'budget',
                },
                {
                  path: 'atlas/Feedblack Loops LLC',
                  name: 'project',
                },
              ],
              metric: 'Actuals',
              value: 193635,
              sum: 193635,
            },
            {
              dimensions: [
                {
                  path: 'atlas/legacy/recognized-delegates/*/*',
                  name: 'budget',
                },
                {
                  path: 'atlas/Flip Flap Flop Delegate LLC',
                  name: 'project',
                },
              ],
              metric: 'Actuals',
              value: 201228,
              sum: 201228,
            },
            {
              dimensions: [
                {
                  path: 'atlas/legacy/recognized-delegates/*/*',
                  name: 'budget',
                },
                {
                  path: 'atlas/GFX Labs',
                  name: 'project',
                },
              ],
              metric: 'Actuals',
              value: 102878,
              sum: 102878,
            },
            {
              dimensions: [
                {
                  path: 'atlas/legacy/recognized-delegates/*/*',
                  name: 'budget',
                },
                {
                  path: 'atlas/Coldiron.eth',
                  name: 'project',
                },
              ],
              metric: 'Actuals',
              value: 34452,
              sum: 34452,
            },
          ],
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
