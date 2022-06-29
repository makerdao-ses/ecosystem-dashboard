import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';
import { fetchCoreUnits } from './cu-table.api';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

export interface CuTableState {
  items: CoreUnitDto[],
  status: string,
}

const initialState: CuTableState = {
  items: [],
  status: 'loading',
};

export const loadCuTableItemsAsync = createAsyncThunk(
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
    builder.addCase(loadCuTableItemsAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(loadCuTableItemsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload as [];
    }).addCase(loadCuTableItemsAsync.rejected, (state) => {
      state.status = 'idle';
    });
  }
});

export const { clearTable } = cuTableSlice.actions;

export const selectCuTableItems = (state: RootState) => state.cuTable.items;
export const selectCuTableStatus = (state: RootState) => state.cuTable.status;

export default cuTableSlice.reducer;
