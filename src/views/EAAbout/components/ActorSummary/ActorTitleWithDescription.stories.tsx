import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import ActorTitleWithDescription from './ActorTitleWithDescription';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ActorTitleWithDescription> = {
  title: 'Components/Actor/ActorTitleWithDescription',
  component: ActorTitleWithDescription,
  parameters: {
    nextjs: {
      router: {
        path: '/ecosystem-actors/[code]',
        asPath: '/ecosystem-actors/PH',
        query: {
          code: 'PH',
        },
      },
    },
    chromatic: {
      viewports: [1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    actorAbout: new EcosystemActorBuilder()
      .withId('23')
      .withCode('PH-001')
      .withShortCode('PHX')
      .withName('Phoenix Labs')
      .withType(ResourceType.EcosystemActor)
      .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
      .addCategory('Active Ecosystem Actor')
      .withSentenceDescription(
        'Phoenix Labs is focused on vertically integrating existing products into Maker and sharing the value creation with developers.'
      )
      .addScope({
        id: '1',
        code: 'SUP',
        name: TeamScopeEnum.SupportScope,
      })
      .addScope({
        id: '3',
        code: 'PRO',
        name: TeamScopeEnum.ProtocolScope,
      })
      .withSocials({
        twitter: '#',
        github: '#',
        discord: '#',
        website: '#',
        linkedIn: '#',
      } as SocialMediaChannels)
      .build(),
    showTextDescription: true,
    showDescription: true,
  },
  {
    actorAbout: new EcosystemActorBuilder()
      .withId('23')
      .withCode('PH-001')
      .withShortCode('PHX')
      .withName('Phoenix Labs lo...')
      .withType(ResourceType.EcosystemActor)
      .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
      .addCategory('Active Ecosystem Actor')
      .withSentenceDescription(
        'Phoenix Labs is focused on vertically integrating existing products into Maker and sharing the value creation with developers.'
      )
      .addScope({
        id: '1',
        code: 'SUP',
        name: TeamScopeEnum.SupportScope,
      })
      .addScope({
        id: '3',
        code: 'PRO',
        name: TeamScopeEnum.ProtocolScope,
      })
      .withSocials({
        twitter: '#',
        github: '#',
        discord: '#',
        website: '#',
        linkedIn: '#',
      } as SocialMediaChannels)
      .build(),
    showTextDescription: true,
    showDescription: true,
  },
];

const [[Actors, ActorsDark], [ActorsTable, ActorsTableDark]] = createThemeModeVariants(
  ActorTitleWithDescription,
  variantsArgs
);
export { Actors, ActorsDark, ActorsTable, ActorsTableDark };

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-350124&mode=design&t=D00Pjjed55z050hV-4',
        options: {
          style: {
            left: 4,
            top: -10,
          },
          componentStyle: {
            width: 375,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-340323&mode=design&t=0qX5pj1x7MZltO9q-4',
        options: {
          style: {
            left: -2,
            top: -3,
          },
          componentStyle: {
            width: 1024,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-335728&mode=design&t=MQGIsdRgayKVJkln-4',
        options: {
          style: {
            left: -48,
            top: -4,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=34076-41939&mode=design&t=MQGIsdRgayKVJkln-4',
        options: {
          style: {
            left: -64,
            top: -4,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

ActorsTable.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=34573-237843&mode=design&t=qhjtkXxRT0krvDPA-4',
        options: {
          style: {
            left: -1,
            top: -4,
          },
          componentStyle: {
            width: 768,
          },
        },
      },
    },
  },
};
ActorsDark.parameters = {};
ActorsTableDark.parameters = {};
