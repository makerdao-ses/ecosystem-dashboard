import { CommentBuilder } from '@ses/core/business-logic/builders/comment.builder';
import { UserBuilder } from '@ses/core/business-logic/builders/user.builder';
import { BudgetStatus } from '@ses/core/models/dto/core-unit.dto';
import { withCoreUnitContext } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AuditorCommentCard from './auditor-comment-card';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/AuditorComments/CommentCard',
  component: AuditorCommentCard,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280],
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [withCoreUnitContext({ shortCode: 'SES' } as CoreUnitDto)],
  argTypes: {
    status: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
    hasStatusChange: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    commentDescription: {
      defaultValue: undefined,
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof AuditorCommentCard>;

const variantsArgs = [
  {
    verb: 'submitted',
    comment: new CommentBuilder()
      .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().withUsername('wkampmann').build())
      .withTimestamp('2022-10-17T12:32:00.000Z')
      .build(),
  },
  {
    comment: new CommentBuilder()
      .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().withUsername('wkampmann').build())
      .withComment(
        // eslint-disable-next-line spellcheck/spell-checker
        'Our September forecast included offsite participation estimates for more people that ended up participating. Equally we have managed to get speaker tickets.\n\n**Updating:**\n\n- Actual expenses\n- FTE number'
      )
      .withTimestamp('2022-10-17T12:32:00.000Z')
      .build(),
  },
];

export const [[StatusChange, StatusChangeDarkMode], [Comment, DarkModeComment]] = createThemeModeVariants(
  AuditorCommentCard,
  variantsArgs
);

StatusChange.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10662%3A140374',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10662%3A132865',
        options: {
          componentStyle: {
            width: 545,
          },
          style: {
            top: -18,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10662%3A127300',
        options: {
          componentStyle: {
            width: 866,
          },
        },
      },
      1280: {
        component: 'https:// www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10662%3A124775',
        options: {
          componentStyle: {
            width: 912,
          },
        },
      },
    },
    options: {
      style: {
        top: -20,
        left: -40,
      },
    },
  } as FigmaParams,
};
