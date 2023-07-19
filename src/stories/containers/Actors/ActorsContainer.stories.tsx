import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import ActorsContainer from './ActorsContainer';
import { defaultSocials } from './utils/utils';
import type { Team } from '@ses/core/models/interfaces/team';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';
export default {
  title: 'Pages/Actors',
  component: ActorsContainer,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/ecosystem-actors',
    },
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ActorsContainer>;

const variantsArgs = [
  {
    actors: [
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Powerhouse Inc.')
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
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Zoenix Labs')
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
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('PPhoenix Labs')
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
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('ZPhoenix Labs')
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
        .addScope({
          id: '3',
          code: 'STA',
          name: 'Stability Scope',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Phoeull Up')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitators')
        .withSocials(defaultSocials)
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
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('ChainSecurity')
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
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withName('Certora')
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

export const [[LightMode, DarkMode], [LightModeMobile, DarkModeMobile]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <ActorsContainer {...props} />
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:244239&mode=design&t=c3Fqcr4H2ZhqQ4uv-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:229765&mode=design&t=c3Fqcr4H2ZhqQ4uv-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:230493&mode=design&t=c3Fqcr4H2ZhqQ4uv-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:230150&mode=design&t=c3Fqcr4H2ZhqQ4uv-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:234480&mode=design&t=c3Fqcr4H2ZhqQ4uv-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:229451&mode=design&t=c3Fqcr4H2ZhqQ4uv-4',
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

LightModeMobile.parameters = {
  chromatic: {
    viewports: [375],
  },
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20802:265996&mode=design&t=BFZUaHoGzRars0yc-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 375,
          },
        },
      },
    },
  } as FigmaParams,
};
DarkModeMobile.parameters = {
  chromatic: {
    viewports: [375],
  },
};
