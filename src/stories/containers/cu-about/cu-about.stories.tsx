import React from 'react';
import CuAboutContainer from './cu-about-container';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { CurrentCoreUnitAbout, initialState } from './cu-about-slice';
// import { initialState as cuTableInitialState } from '../../../containers/cu-table/cu-table.stories.states';
import { initialState as cuTableInitialState } from '../../containers/cu-table/cu-table.stories.states';

export default {
  title: 'Containers/CuAboutContainer',
  component: CuAboutContainer,
} as ComponentMeta<typeof CuAboutContainer>;
const Template: ComponentStory<typeof CuAboutContainer> = () => <CuAboutContainer />;
export const CuAboutPage = Template.bind({});

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
CuAboutPage.decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (story) => <MemoryRouter><Mockstore cuAbout={MockedState}>{story()}</Mockstore></MemoryRouter>
];
CuAboutPage.args = {};
