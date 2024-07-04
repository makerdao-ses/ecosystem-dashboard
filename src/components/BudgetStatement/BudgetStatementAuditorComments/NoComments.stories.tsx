import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import NoComments from './NoComments';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof NoComments> = {
  title: 'Components/AuditorComments/NoComments',
  component: NoComments,
};
export default meta;

const [[Light, Dark]] = createThemeModeVariants(NoComments);
export { Light, Dark };
