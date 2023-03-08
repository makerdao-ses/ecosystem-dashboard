import { configureStore } from '@reduxjs/toolkit';
import cuAboutReducer from '../../stories/containers/CUAbout/cuAboutSlice';
import cuTableReducer from '../../stories/containers/CUTable/CuTableSlice';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cuTable: cuTableReducer,
    cuAbout: cuAboutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
