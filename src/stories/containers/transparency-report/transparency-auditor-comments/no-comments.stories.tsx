import { createThemeModeVariants } from '../../../../core/utils/storybook/factories';
import NoComments from './no-comments';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/NoComments',
  component: NoComments,
} as ComponentMeta<typeof NoComments>;

export const [[Light, Dark]] = createThemeModeVariants(NoComments);
