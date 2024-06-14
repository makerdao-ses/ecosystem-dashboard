import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import { TeamStatus } from '@/core/models/interfaces/types';
import { withFixedPositionRelative, withoutSBPadding } from '@/core/utils/storybook/decorators';
import TeamHeader from './TeamHeader';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TeamHeader> = {
  title: 'Fusion/Components/TeamHeader',
  component: TeamHeader,
  decorators: [withFixedPositionRelative, withoutSBPadding],
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
    team: {
      code: 'PH',
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
];

const [[LightModeDefault, DarkModeDefault]] = createThemeModeVariants(TeamHeader, variantsArgs, false);

export { LightModeDefault, DarkModeDefault };
