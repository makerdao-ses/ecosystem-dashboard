import React from 'react';
import { CutableColumnTeamMember } from './cutable-column-team-member';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cuTableReducer, { CuTableState } from '../../containers/cutable/cutable.slice';

const store = configureStore({
  reducer: {
    cuTable: cuTableReducer
  }
});

const MockedState: CuTableState = {
  items: [],
  status: 'idle',
  facilitatorImages: {}
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Mockstore = ({ children }) => (
  <Provider
    store={store}>
    {children}
  </Provider>
);

export default {
  title: 'Components/CUTable/ColumnTeamMember',
  components: CutableColumnTeamMember
} as ComponentMeta<typeof CutableColumnTeamMember>;

const Template: ComponentStory<typeof CutableColumnTeamMember> = (args) => <CutableColumnTeamMember {...args} />;

export const Default = Template.bind({});
Default.decorators = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>
];
Default.args = {
  fte: 4.5,
  members: [
    { name: 'John Doe' },
    { name: 'Billy Ferguson' },
    { name: 'Jackie Chang' },
  ]
};

export const Empty = Template.bind({});
Empty.decorators = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>
];
Empty.args = {
  fte: 1,
  members: []
};
