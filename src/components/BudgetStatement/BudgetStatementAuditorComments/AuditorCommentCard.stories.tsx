import { CommentBuilder } from '@ses/core/businessLogic/builders/commentBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
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
      .build(),
    resource: ResourceType.CoreUnit,
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10662%3A140374',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
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
      1024: {
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
