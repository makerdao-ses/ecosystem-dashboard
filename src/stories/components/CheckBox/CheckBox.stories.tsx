import CheckBox from '@ses/components/CheckBox/CheckBox';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CheckBox> = {
  title: 'Components/General/CheckBox',
  component: CheckBox,
};
export default meta;

const variantsArgs = [
  {
    isChecked: true,
    label: 'Show empty budget categories',
  },
  {
    isChecked: false,
    label: 'Show empty budget categories',
  },
];

const [[Checked, CheckedDarkMode], [Unchecked, UncheckedDarkMode]] = createThemeModeVariants(CheckBox, variantsArgs);
export { Checked, CheckedDarkMode, Unchecked, UncheckedDarkMode };

Checked.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=3384%3A17690&t=0QkX2DAbV9YY8AId-4',
  },
};

CheckedDarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=3384%3A17690&t=0QkX2DAbV9YY8AId-4',
  },
};
Unchecked.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=3384%3A17690&t=0QkX2DAbV9YY8AId-4',
  },
};

UncheckedDarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=3384%3A17690&t=0QkX2DAbV9YY8AId-4',
  },
};
