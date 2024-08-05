import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import AppLayout from '@ses/containers/AppLayout/AppLayout';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import { EcosystemActorBuilder } from '@/core/businessLogic/builders/actors/actorsBuilder';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType, TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { DefaultRoadmap } from '@/views/RoadmapMilestones/staticData';
import { defaultSocials } from '../EcosystemActorsIndex/utils/utils';
import HomeView from './HomeView';
import { headerCardData } from './staticData';
import type { HomeViewProps } from './HomeView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HomeView> = {
  title: 'Fusion/Pages/Home',
  component: HomeView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    headerCard: {
      title: headerCardData.title,
      description: headerCardData.description,
      buttonTexts: headerCardData.buttonTexts,
    },
    revenueAndSpendingData: {
      2021: {
        fees: 50000,
        liquidationIncome: 120000,
        psm: 30000,
        daiSpent: 70000,
        mkrVesting: 20000,
        annualProfit: 100000,
      },
      2022: {
        fees: 60000,
        liquidationIncome: 140000,
        psm: 35000,
        daiSpent: 80000,
        mkrVesting: 25000,
        annualProfit: 115000,
      },
      2023: {
        fees: 70000,
        liquidationIncome: 160000,
        psm: 40000,
        daiSpent: 90000,
        mkrVesting: 30000,
        annualProfit: 130000,
      },
      2024: {
        fees: 80000,
        liquidationIncome: 180000,
        psm: 45000,
        daiSpent: 100000,
        mkrVesting: 35000,
        annualProfit: 145000,
      },
    } as HomeViewProps['revenueAndSpendingData'],
    teams: [
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
        .addCategory(TeamCategory.Growth)
        .addCategory(TeamCategory.Finance)
        .withType(ResourceType.CoreUnit)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')

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

        .withId('23')
        .withCode('DWZ-001')
        .withShortCode('DWZ')
        .withName('Dewiz')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.CoreUnit)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory(TeamCategory.Finance)

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
    roadmaps: [{ ...DefaultRoadmap }],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <HomeView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);

export { LightMode, DarkMode };
