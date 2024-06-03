import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType, TeamStatus } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import AppLayout from '@/stories/containers/AppLayout/AppLayout';
import ActorsContainer from './ActorsContainer';
import { defaultSocials } from './utils/utils';
import type { Team } from '@ses/core/models/interfaces/team';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof ActorsContainer> = {
  title: 'Fusion/Pages/Actors',
  component: ActorsContainer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/ecosystem-actors',
      },
    },
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
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
        .withShortCode('PH')
        .withName('Powerhouse Inc.')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .addCategory(TeamRole.ScopeFacilitator)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')

        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PHX-001')
        .withShortCode('PHX')
        .withName('Phoenix Labs')
        .withStatus(TeamStatus.Accepted)
        .addCategory(TeamRole.ScopeFacilitator)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
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
        .addCategory(TeamRole.ActiveEcosystemActor)
        .withId('23')
        .withCode('VPAC-001')
        .withShortCode('VPAC')
        .withName('Viridian Protector Advisory Company')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')
        .addScope({
          id: '1',
          code: 'GOV',
          name: TeamScopeEnum.GovernanceScope,
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
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
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('DWZ-001')
        .withShortCode('DWZ')
        .withName('Dewiz')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Advisory Council Member')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'STA',
          name: TeamScopeEnum.AccessibilityScope,
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
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('SSA-001')
        .withName('Sidestream')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('SSA')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'PRO',
          name: TeamScopeEnum.SupportScope,
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
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('PUL-001')
        .withShortCode('PUL')
        .withName('Pull Up')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitators')
        .withSocials(defaultSocials)
        .addScope({
          id: '1',
          code: 'GOV',
          name: TeamScopeEnum.GovernanceScope,
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
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('BAL-001')
        .withName('BALabs')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('BAL')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
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
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('VWZ-001')
        .withName('VoteWizard')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('VWZ')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Advisory Council Member')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
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
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('STH-001')
        .withName('Steakhouse')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('STH')
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
          code: 'STA',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials(defaultSocials)
        .build(),
    ] as Team[],
    stories: false,
  },
  {
    actors: [] as Team[],
    stories: true,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <ActorsContainer {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
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
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=163:9205&t=ljb07LClCkteoCr1-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 375,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=22:6925&t=ljb07LClCkteoCr1-4',
        options: {
          style: {
            top: -50,
            left: -16,
          },
          componentStyle: {
            width: 768,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20:19052&t=ljb07LClCkteoCr1-4',
        options: {
          style: {
            top: -50,
            left: -16,
          },
          componentStyle: {
            width: 1024,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20:18363&t=ljb07LClCkteoCr1-4',
        options: {
          style: {
            top: -50,
            left: -16,
          },
          componentStyle: {
            width: 1280,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20:15879&t=ljb07LClCkteoCr1-4',
        options: {
          style: {
            top: -50,
            left: -16,
          },
          componentStyle: {
            width: 1440,
          },
        },
      },
    },
  } as FigmaParams,
};
