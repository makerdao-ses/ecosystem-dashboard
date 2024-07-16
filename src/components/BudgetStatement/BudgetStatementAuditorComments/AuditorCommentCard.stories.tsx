import { CommentBuilder } from '@ses/core/businessLogic/builders/commentBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import { withTeamContext } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AuditorCommentCard from './AuditorCommentCard';
import type { Team } from '@ses/core/models/interfaces/team';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof AuditorCommentCard> = {
  title: 'Fusion/Components/Budget Statements/Comments/CommentCard',
  component: AuditorCommentCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [withTeamContext({ shortCode: 'SES' } as Team)],
  argTypes: {
    hasStatusChange: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};
export default meta;

const variantsArgs = [
  {
    verb: 'submitted',
    comment: new CommentBuilder()
      .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().withUsername('wkampmann').build())
      .withTimestamp('2022-10-17T12:32:00.000Z')
      .withStatus(BudgetStatus.Draft)
      .build(),
    hasStatusChange: true,
    resource: ResourceType.CoreUnit,
  },
  {
    comment: new CommentBuilder()
      .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().withUsername('wkampmann').build())
      .withComment(
        // eslint-disable-next-line spellcheck/spell-checker
        'Our September forecast included offsite participation estimates for more people that ended up participating. Equally we have managed to get speaker tickets.\n\n# Updating:\n\n- Actual expenses\n- FTE number'
      )
      .withTimestamp('2022-10-17T12:32:00.000Z')
      .build(),
    resource: ResourceType.CoreUnit,
  },
];

const [[StatusChange, StatusChangeDarkMode], [Comment, DarkModeComment]] = createThemeModeVariants(
  AuditorCommentCard,
  variantsArgs
);
export { StatusChange, StatusChangeDarkMode, Comment, DarkModeComment };

StatusChange.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-97728',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: 8,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-97461',
        options: {
          componentStyle: {
            width: 461,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-97190',
        options: {
          componentStyle: {
            width: 714,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-96919',
        options: {
          componentStyle: {
            width: 892,
          },
        },
      },
    },
    options: {
      style: {
        top: -11,
        left: -14,
      },
    },
  } as FigmaParams,
};

Comment.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-97756',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-97491',
        options: {
          componentStyle: {
            width: 461,
          },
          style: {
            top: -11,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-97220',
        options: {
          componentStyle: {
            width: 714,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4968-96949',
        options: {
          componentStyle: {
            width: 892,
          },
        },
      },
    },
    options: {
      style: {
        top: -11,
        left: -14,
      },
    },
  } as FigmaParams,
};
