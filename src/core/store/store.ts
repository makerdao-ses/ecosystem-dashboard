import { configureStore } from '@reduxjs/toolkit';
import cuAboutSlice from '@/views/CoreUnitAbout/cuAboutSlice';
import { cuTableSlice } from '@/views/CoreUnitsIndexView/CuTableSlice';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cuTable: cuTableSlice.reducer,
    cuAbout: cuAboutSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
