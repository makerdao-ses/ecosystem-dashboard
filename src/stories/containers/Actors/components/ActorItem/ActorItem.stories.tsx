import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ActorItem from './ActorItem';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Actor/ActorItem',
  component: ActorItem,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1440],
    },
  },
} as ComponentMeta<typeof ActorItem>;
const variantsArgs = [
  {
    actor: new EcosystemActorBuilder()
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
];

export const [[Actors, ActorsDark]] = createThemeModeVariants(ActorItem, variantsArgs);

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:244241&t=pS3L5imzU3EZQ8lC-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:243818&t=pS3L5imzU3EZQ8lC-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 770,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:239604&t=pS3L5imzU3EZQ8lC-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 1130,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:237930&t=pS3L5imzU3EZQ8lC-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20872:241106&mode=design&t=Bt5HDuSSPlu2Jowe-4',
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
