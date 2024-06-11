import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { CommitmentJob } from '../../../core/enums/commitmentJobEnum';
import CardInfoMember from './CardInfoMember';
import type { CuJobEnum } from '../../../core/enums/cuJobEnum';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CardInfoMember> = {
  title: 'Components/CUAbout/CardInfoMember',
  component: CardInfoMember,
};
export default meta;

const variantsArgs = [
  {
    contributorCommitment: {
      id: '1',
      jobTitle: 'Team Lead' as CuJobEnum,
      startDate: '2019-01-01',
      commitment: CommitmentJob.Fulltime,
      contributor: [
        {
          id: '1',
          name: 'Wouter Kampmann',
          forumHandle: 'wouter@ses.makerdao.network',
          discordHandle: 'https://discord.gg/h7GKvqDyDP',
          twitterHandle: 'https://twitter.com/MakerDAO_SES',
          email: 'Jack@ses.makerdao.network',
          facilitatorImage: '',
        },
      ],
    } as ContributorCommitment,
  },
  {
    contributorCommitment: {
      id: '1',
      startDate: '2019-01-01',
      jobTitle: 'Facilitator' as CuJobEnum,
      commitment: CommitmentJob.Fulltime,
      contributor: [
        {
          name: 'Juan Julien',
          forumHandle: 'juan@ses.makerdao.network',
          discordHandle: '',
          email: 'juan@ses.makerdao.network',
        },
      ],
    } as ContributorCommitment,
  },
];

const [[CardInfoMemberTeamLeader, CardInfoMemberTeamLeaderDark], [CoreUnitItemBigDesk, CoreUnitItemDarkBigDesk]] =
  createThemeModeVariants(CardInfoMember, variantsArgs);

export { CardInfoMemberTeamLeader, CardInfoMemberTeamLeaderDark, CoreUnitItemBigDesk, CoreUnitItemDarkBigDesk };

// CoreUnitItem.parameters = {
//   chromatic: {
//     viewports: [375, 768, 1024],
//     pauseAnimationAtEnd: true,
//   },
//   date: new Date('2023-03-02T09:56:16Z'),

//   figma: {
//     component: {
//       375: {
//         component:
//           'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:51949&t=4msz1XMpVAvVukiF-4',
//         options: {
//           componentStyle: {
//             width: 343,
//           },
//           style: {
//             top: 4,
//             left: -14,
//           },
//         },
//       },
//       768: {
//         component:
//           'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=342:66196&t=4msz1XMpVAvVukiF-4',
//         options: {
//           componentStyle: {
//             width: 704,
//           },
//           style: {
//             top: 4,
//             left: -14,
//           },
//         },
//       },

//       1024: {
//         component:
//           'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:45299&t=hb8vdSiYDruV77HV-4',
//         options: {
//           componentStyle: {
//             width: 960,
//           },
//           style: {
//             top: 6,
//             left: -12,
//           },
//         },
//       },
//     },
//   },
// };
// CoreUnitItemDark.parameters = {};
// CoreUnitItemBigDesk.parameters = {
//   chromatic: {
//     viewports: [1280, 1440],
//   },
//   date: new Date('2023-03-02T09:56:16Z'),
//   figma: {
//     component: {
//       1280: {
//         component:
//           'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:43652&t=Bw203T10r67Noojw-4',
//         options: {
//           componentStyle: {
//             width: 1200,
//           },
//           style: {
//             top: 6,
//             left: -12,
//           },
//         },
//       },
//       1440: {
//         component:
//           'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:43652&t=St2JexmyIMfCV6xZ-4',
//         options: {
//           componentStyle: {
//             width: 1200,
//           },
//           style: {
//             top: 6,
//             left: -12,
//           },
//         },
//       },
//     },
//   },
// };
// CoreUnitItemDarkBigDesk.parameters = {};
