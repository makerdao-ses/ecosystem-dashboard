import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import ActorsContainer from './ActorsContainer';
import { defaultSocials } from './utils/utils';
import type { Team } from '@ses/core/models/interfaces/team';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof ActorsContainer> = {
  title: 'Pages/Actors',
  component: ActorsContainer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/ecosystem-actors',
      },
    },
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2023-08-02T09:56:16Z'),
  },
};
export default meta;

const variantsArgs = [
  {
    actors: [
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Powerhouse Inc. ')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')

        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Phoenix Labs')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: 'Support Scope',
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })

        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Viridian Protector Advisory Company')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')
        .addScope({
          id: '1',
          code: 'GOV',
          name: 'Governance Scope',
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: 'Accessibility Scope',
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Dewiz')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Advisory Council Member')
        .addScope({
          id: '1',
          code: 'SUP',
          name: 'Support Scope',
        })
        .addScope({
          id: '3',
          code: 'STA',
          name: 'Stability Scope',
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Sidestream')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: 'Support Scope',
        })
        .addScope({
          id: '3',
          code: 'PRO',
          name: 'Protocol Scope',
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Pull Up')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitators')
        .withSocials(defaultSocials)
        .addScope({
          id: '1',
          code: 'GOV',
          name: 'Governance Scope',
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })

        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('BA Labs')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: 'Support Scope',
        })
        .addScope({
          id: '3',
          code: 'STA',
          name: 'Stability Scope',
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('ChainSecurity')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Advisory Council Member')
        .addScope({
          id: '1',
          code: 'SUP',
          name: 'Support Scope',
        })

        .withSocials(defaultSocials)
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Certora')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')
        .addScope({
          id: '1',
          code: 'SUP',
          name: 'Support Scope',
        })
        .addScope({
          id: '3',
          code: 'STA',
          name: 'Accessibility Scope',
        })
        .withSocials(defaultSocials)
        .build(),
    ] as Team[],
    stories: true,
  },
  {
    actors: [] as Team[],
    stories: false,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <ActorsContainer {...props} />
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20207:261115&mode=design&t=wRmSRg2ehkFZ7VM6-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20191:258133&mode=design&t=wRmSRg2ehkFZ7VM6-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 834,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:239563&mode=design&t=QsP3Vsvwutj2T5IZ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1194,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:240416&mode=design&t=QsP3Vsvwutj2T5IZ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1280,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:242292&mode=design&t=QsP3Vsvwutj2T5IZ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1440,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:243304&mode=design&t=QsP3Vsvwutj2T5IZ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1920,
          },
        },
      },
    },
  } as FigmaParams,
};
