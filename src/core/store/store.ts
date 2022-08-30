import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cuTableReducer from '../../stories/containers/cu-table/cu-table.slice';
import cuAboutReducer from '../../stories/containers/cu-about/cu-about-slice';
import popoverReducer from '../../stories/components/custom-popover/custom-popover.slice';

export const store = configureStore({
  reducer: {
    cuTable: cuTableReducer,
    cuAbout: cuAboutReducer,
    popover: popoverReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
