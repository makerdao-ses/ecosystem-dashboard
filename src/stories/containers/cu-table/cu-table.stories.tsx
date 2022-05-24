import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuTable } from './cu-table';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { CuTableState } from './cu-table.slice';
import { initialState } from './cu-table.stories.states';

const store = configureStore({
  reducer: {
    cuTable: createSlice({
      name: 'cuTable',
      initialState,
      reducers: {}
    }).reducer
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
  title: 'Containers/CUTable',
  components: CuTable,
  excludeStories: /.*MockedState$/,
} as ComponentMeta<typeof CuTable>;

const Template: ComponentStory<typeof CuTable> = () => <CuTable />;

export const Default = Template.bind({});
Default.decorators = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>
];
Default.args = {};
