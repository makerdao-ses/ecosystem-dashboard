import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CUTable } from './cutable';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cuTableReducer, { CuTableState } from './cutable.slice';

const store = configureStore({
  reducer: {
    cuTable: cuTableReducer
  }
});

const MockedState: CuTableState = {
  items: [],
  status: 'idle'
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
  components: CUTable,
  excludeStories: /.*MockedState$/,
} as ComponentMeta<typeof CUTable>;

const Template: ComponentStory<typeof CUTable> = () => <CUTable />;

export const Default = Template.bind({});
Default.decorators = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>
];
Default.args = {};
