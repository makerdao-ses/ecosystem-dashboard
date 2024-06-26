import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import TeamMember from './TeamMember';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TeamMember> = {
  title: 'Fusion/Views/Core Unit About/TeamMember',
  component: TeamMember,
};

export default meta;

const variantsArgs = [
  {
    ftes: 7.5,
  },
  {
    ftes: 1,
  },
];
const [[ValuesTwoDigit, ValuesTwoDigitDark], [ValuesOneDigitDesk, ValuesOneDigitDarkDesk]] = createThemeModeVariants(
  TeamMember,
  variantsArgs
);
export { ValuesTwoDigit, ValuesTwoDigitDark, ValuesOneDigitDesk, ValuesOneDigitDarkDesk };
