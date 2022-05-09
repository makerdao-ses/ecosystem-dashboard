import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cuTableReducer from '../../stories/containers/cutable/cutable.slice';

export const store = configureStore({
  reducer: {
    cuTable: cuTableReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
