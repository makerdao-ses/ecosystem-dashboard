import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { CurrentCoreUnitAbout, initialState } from '../../../containers/cu-about/cu-about-slice';
import { initialState as cuTableInitialState } from '../../../containers/cu-table/cu-table.stories.states';
import { Provider } from 'react-redux';
import CuAboutPageTesting from './cu-about';

export default {
  title: 'Pages/CuAbout',
  component: CuAboutPageTesting,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CuAboutPageTesting>;

const Template: ComponentStory<typeof CuAboutPageTesting> = () => <CuAboutPageTesting />;

const store = configureStore({
  reducer: {
    cuAbout: createSlice({
      name: 'cuAbout',
      initialState,
      reducers: {}
    }).reducer,
    cuTable: createSlice({
      name: 'cuTable',
      initialState: cuTableInitialState,
      reducers: {}
    }).reducer
  }
});

const MockedState: CurrentCoreUnitAbout = initialState;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Mockstore = ({ children }) => (
  <Provider
    store={store}>
    {children}
  </Provider>
);

export const CuAboutPage = Template.bind({});
CuAboutPage.decorators = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (story) => <MemoryRouter><Mockstore cuAbout={MockedState}>{story()}</Mockstore></MemoryRouter>
];
CuAboutPage.args = {};
