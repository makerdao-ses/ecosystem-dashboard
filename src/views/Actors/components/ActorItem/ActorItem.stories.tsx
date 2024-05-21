import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import ActorItem from './ActorItem';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ActorItem> = {
  title: 'Components/Actor/ActorItem',
  component: ActorItem,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1440],
    },
    date: new Date('2023-07-12T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    actor: new EcosystemActorBuilder()
      .withId('23')
      .withCode('PWR-001')
      .withShortCode('PWR')
      .withName('Powerhouse')
      .withType(ResourceType.EcosystemActor)
      .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
      .withLastActivity({
        created_at: '2023-07-12T09:08:34.123',
        description: '',
        event: '',
        params: {},
        id: '45',
      })
      .addCategory('Active Ecosystem Actor')
      .addScope({
        id: '1',
        code: 'SUP',
        name: TeamScopeEnum.SupportScope,
      })
      .addScope({
        id: '3',
        code: 'STA',
        name: TeamScopeEnum.StabilityScope,
      })
      .withSocials({
        twitter: '#',
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
        votingPortal: '#',
        forumTag: '#',
        github: '#',
        discord: '#',
        website: '#',
        linkedIn: '#',
      } as SocialMediaChannels)
      .build(),
  },
  {
    actor: new EcosystemActorBuilder()
      .withId('23')
      .withCode('PH-001')
      .withShortCode('PH')
      .withName('Phoenix Labs')
      .withType(ResourceType.EcosystemActor)
      .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
      .addCategory('Scope Facilitator')
      .addScope({
        id: '1',
        code: 'SUP',
        name: TeamScopeEnum.SupportScope,
      })
      .addScope({
        id: '3',
        code: 'ACC',
        name: TeamScopeEnum.AccessibilityScope,
      })
      .withSocials({
        twitter: '#',
        github: '#',
        discord: '#',
      } as SocialMediaChannels)
      .build(),
  },
];

const [[Actors, ActorsDark], [ActorsNoData, ActorsNoDataDark]] = createThemeModeVariants(ActorItem, variantsArgs);
export { Actors, ActorsDark, ActorsNoData, ActorsNoDataDark };

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-347899&mode=design&t=ci6ePFFDVYjoFah1-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-342218&mode=design&t=ci6ePFFDVYjoFah1-4',
        options: {
          style: {
            left: -12,
            top: -8,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-337490&mode=design&t=ci6ePFFDVYjoFah1-4',
        options: {
          style: {
            left: -3,
            top: 0,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-333770&mode=design&t=ci6ePFFDVYjoFah1-4',
        options: {
          style: {
            left: -3,
            top: 0,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29850-329888&mode=design&t=ci6ePFFDVYjoFah1-4',
        options: {
          style: {
            left: -3,
            top: 0,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
ActorsNoData.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20802:265431&mode=design&t=I60yJeKsDvkkmRMX-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:239020&mode=design&t=I60yJeKsDvkkmRMX-4',
        options: {
          style: {
            left: -12,
            top: -8,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20191:256836&mode=design&t=I60yJeKsDvkkmRMX-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:240505&mode=design&t=I60yJeKsDvkkmRMX-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21280:242382&mode=design&t=I60yJeKsDvkkmRMX-4',
        options: {
          style: {
            left: -3,
            top: -2,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

ActorsDark.parameters = {};
