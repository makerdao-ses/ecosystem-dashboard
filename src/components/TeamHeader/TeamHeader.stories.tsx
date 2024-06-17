import { styled } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType, TeamStatus } from '@/core/models/interfaces/types';
import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import TeamHeader from './TeamHeader';
import type { Meta, StoryFn } from '@storybook/react';

const meta: Meta<typeof TeamHeader> = {
  title: 'Fusion/Components/TeamHeader',
  component: TeamHeader,
  decorators: [
    (Story: StoryFn) => (
      <StoryWrapperPositionRemover>
        <Story />
      </StoryWrapperPositionRemover>
    ),
    withoutSBPadding,
  ],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const StoryWrapperPositionRemover = styled('div')({
  '& > div > div': {
    position: 'relative',
    top: 0,
  },
});

const variantsArgs = [
  {
    team: {
      type: ResourceType.EcosystemActor,
      shortCode: 'PH',
      name: 'Powerhouse',
      sentenceDescription:
        "The aim of SES is to sustainably grow the Maker Protocol's moats by systematically removing barriers between the decentralized workforce, capital, and work.",
      scopes: [
        {
          id: '1',
          name: 'Support Scope',
          code: 'SUP',
        },
        {
          id: '2',
          name: 'Stability Scope',
          code: 'CTA',
        },
      ],
      status: TeamStatus.Accepted,
      category: [TeamRole.ActiveEcosystemActor],
      socialMediaChannels: [
        {
          website: 'https://powerhouse.xyz/',
          twitter: 'https://twitter.com/powerhouse_xyz',
          linkedIn: 'https://www.linkedin.com/company/powerhouse-xyz',
          github: 'https://github.com/powerhouse',
        },
      ],
    } as Team,
  },
  {
    team: {
      type: ResourceType.CoreUnit,
      shortCode: 'SES',
      name: 'Sustainable Ecosystem Scaling',
      sentenceDescription:
        'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.',
      scopes: [
        {
          id: '1',
          name: 'Support Scope',
          code: 'SUP',
        },
        {
          id: '2',
          name: 'Stability Scope',
          code: 'CTA',
        },
      ],
      status: TeamStatus.Accepted,
      category: ['Technical', 'Growth'],
      socialMediaChannels: [
        {
          website: 'https://powerhouse.xyz/',
          twitter: 'https://twitter.com/powerhouse_xyz',
          linkedIn: 'https://www.linkedin.com/company/powerhouse-xyz',
          github: 'https://github.com/powerhouse',
        },
      ],
    } as Team,
  },
];

const [[EcosystemActorLight, EcosystemActorDark], [CoreUnitLight, CoreUnitDark]] = createThemeModeVariants(
  TeamHeader,
  variantsArgs,
  false
);

export { EcosystemActorLight, EcosystemActorDark, CoreUnitLight, CoreUnitDark };
