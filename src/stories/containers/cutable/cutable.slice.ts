import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';
import { CoreUnitDAO, fetchCoreUnits } from './cutable.api';

export interface CuTableState {
  items: CoreUnitDAO[],
  status: string,
}

const initialState: CuTableState = {
  items: [],
  status: 'idle',
};

export const loadAsync = createAsyncThunk(
  'cuTable/loadItems',
  async() => {
    return await fetchCoreUnits();
  }
);

export const cuTableSlice = createSlice({
  name: 'cuTable',
  initialState,
  reducers: {
    clearTable: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(loadAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload as [];
    });
  }
});

export const selectCuTableItems = (state: RootState) => state.cuTable.items;

export default cuTableSlice.reducer;
