import { ComponentMeta } from '@storybook/react';
import NoComments from './no-comments';
import { createThemeModeVariants } from '../../../../core/utils/storybook';

export default {
  title: 'Components/AuditorComments/NoComments',
  component: NoComments,
} as ComponentMeta<typeof NoComments>;

export const [[Light, Dark]] = createThemeModeVariants(NoComments);
