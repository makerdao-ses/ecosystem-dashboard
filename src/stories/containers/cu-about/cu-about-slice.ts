/* eslint-disable semi */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';
import { CuAbout, fetchCoreUnitByCode } from './cu-about.api';

export enum status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface CurrentCoreUnitAbout {
  cuAbout: CuAbout;
  statusCoreUnit: status;
  error: null;
}

const initialState: CurrentCoreUnitAbout = {
  error: null,
  statusCoreUnit: status.idle,
  cuAbout: {} as CuAbout,
};

export const loadCoreUnitABout = createAsyncThunk(
  'CoreUnit/loadCoreUnitABout',
  async(coreUnitId: string) => fetchCoreUnitByCode(coreUnitId)
);

export const cuAboutSlice = createSlice({
  name: 'cuAbout',
  initialState,
  reducers: {
    clearCoreUNit: (state) => {
      state.cuAbout = {} as CuAbout;
      state.statusCoreUnit = status.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCoreUnitABout.pending, (state) => {
        state.statusCoreUnit = status.loading;
      })
      .addCase(loadCoreUnitABout.fulfilled, (state, action) => {
        state.cuAbout = action.payload;
        state.statusCoreUnit = status.succeeded;
      });
  },
});

export const cuAboutSelector = (state: RootState) => (state.cuAbout);

export const { clearCoreUNit } = cuAboutSlice.actions;
export default cuAboutSlice.reducer;
