import styled from '@emotion/styled';
import { withThemeContext } from '@ses/core/utils/storybook/decorators';
import SingleItemSelect from './SingleItemSelect';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/SingleItemSelect',
  component: SingleItemSelect,
  decorators: [withThemeContext(true, false)],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} as ComponentMeta<typeof SingleItemSelect>;

const Template: ComponentStory<typeof SingleItemSelect> = (props) => <SingleItemSelect {...props} />;

const commonArgs = {
  selected: 'Option 1', // which item is selected
  items: ['Option 1', 'Option 2', 'Option 3'], // select options
  defaultOpen: true, // just for testing
};

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  ...commonArgs,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...commonArgs,
  // no matter what option is selected, the select if going to display this label
  label: 'Custom Label',
};

export const WithUseSelectedAsLabel = Template.bind({});
WithUseSelectedAsLabel.args = {
  ...commonArgs,
  // the selected label is going to be displayed in the "input" component
  // this is a default option
  useSelectedAsLabel: true,
};

export const WithCustomDropdownStyle = Template.bind({});
WithCustomDropdownStyle.args = {
  ...commonArgs,
  // the dropdown is made over a Paper component and all the Paper props can be
  // set through this prop object
  PaperProps: {
    sx: {
      width: '150px',
      boxShadow: '10px 10px 10px red!important',
    },
  },
};

export const WithCustomPosition: ComponentStory<typeof SingleItemSelect> = (props) => (
  <div
    style={{
      margin: 300,
    }}
  >
    <SingleItemSelect {...props} />
  </div>
);
WithCustomPosition.args = {
  ...commonArgs,
  // the dropdown positioning is make using the Popper component, though this prop
  // can be configurable all its Popper props
  PopperProps: {
    placement: 'bottom-end',
  },
};

// the component can be "extended" with `styled` to customize the "input" styles
const CustomInput = styled(SingleItemSelect)({
  width: '150px',
  padding: '4px 8px',
  border: '1px dashed blue',
  backgroundColor: '#908df924',
});
export const WithCustomInput: ComponentStory<typeof SingleItemSelect> = (props) => <CustomInput {...props} />;
WithCustomInput.args = {
  ...commonArgs,
};
