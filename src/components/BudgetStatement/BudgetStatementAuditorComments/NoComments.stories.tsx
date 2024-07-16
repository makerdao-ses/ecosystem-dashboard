import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import NoComments from './NoComments';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof NoComments> = {
  title: 'Fusion/Components/Budget Statements/Comments/NoComments',
  component: NoComments,
};
export default meta;

const [[Light, Dark]] = createThemeModeVariants(NoComments);
export { Light, Dark };
