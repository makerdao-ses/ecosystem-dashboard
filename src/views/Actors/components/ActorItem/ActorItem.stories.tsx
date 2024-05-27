import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
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
    date: new Date('2023-07-14T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    actor: new EcosystemActorBuilder()
      .withId('23')
      .withCode('PWR-001')
      .withShortCode('PH')
      .withName('Powerhouse')
      .withType(ResourceType.EcosystemActor)
      .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png')
      .withLastActivity({
        created_at: '2023-07-01T09:08:34.123',
        description: '',
        event: '',
        params: {},
        id: '45',
      })
      .addCategory(TeamRole.ScopeFacilitator)
      .addScope({
        id: '1',
        code: 'PRO',
        name: TeamScopeEnum.ProtocolScope,
      })
      .addScope({
        id: '3',
        code: 'ACC',
        name: TeamScopeEnum.AccessibilityScope,
      })
      .addScope({
        id: '3',
        code: 'GOV',
        name: TeamScopeEnum.GovernanceScope,
      })
      // .addScope({
      //   id: '3',
      //   code: 'SUP',
      //   name: TeamScopeEnum.SupportScope,
      // })
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

const [[Actors, ActorsDark], [ActorsNoData, ActorsNoDataDark]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      {/* <AppLayout> */}
      <ActorItem {...props} />
      {/* </AppLayout> */}
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { Actors, ActorsDark, ActorsNoData, ActorsNoDataDark };

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=163:12057&t=YRa4hiLSgr73SbTk-4',
        options: {
          style: {
            left: -13,
            top: -12,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=22:6980&t=UQ3jGpNzbeDwWy0W-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20-19119&t=U9h9Tqp3m5KaLp0I-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20-18431&t=PNU8u1CNJ4r0dK5K-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 1200,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20:15990&t=PNU8u1CNJ4r0dK5K-4',
        options: {
          style: {
            left: -14,
            top: -12,
            // top: 90,
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
