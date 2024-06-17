import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SortEnum } from '@/core/enums/sortEnum';
import type { CoreUnitDto } from '@/core/models/dto/coreUnitDTO';
import type { RootState } from '@/core/store/store';
import { fetchCoreUnits } from './cuTableAPI';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CuTableState {
  items: CoreUnitDto[];
  status: string;
  sortColumn: number;
  headersSort: SortEnum[];
}

export const sortNeutralState = [SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral];

const initialState: CuTableState = {
  items: [],
  status: 'loading',
  sortColumn: 0,
  headersSort: [SortEnum.Asc, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral],
};

export const loadCuTableItemsAsync = createAsyncThunk('cuTable/loadItems', async () => await fetchCoreUnits());

export const cuTableSlice = createSlice({
  name: 'cuTable',
  initialState,
  reducers: {
    clearTable: (state: CuTableState) => {
      state.items = [];
    },
    resetHeaderSorting: (state: CuTableState) => {
      state.headersSort = sortNeutralState;
    },
    setSortColumn: (state: CuTableState, action: PayloadAction<number>) => {
      state.sortColumn = action.payload;
    },
    setSort: (state: CuTableState, action: PayloadAction<number>) => {
      if (state.headersSort[action.payload] === 3) {
        state.headersSort = sortNeutralState;
        state.sortColumn = -1;
      } else {
        const temp = [...sortNeutralState];
        temp[action.payload] = state.headersSort[action.payload] + 1;
        state.headersSort = temp;
        state.sortColumn = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCuTableItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCuTableItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload as [];
      })
      .addCase(loadCuTableItemsAsync.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const { clearTable, resetHeaderSorting, setSortColumn, setSort } = cuTableSlice.actions;

export const selectCuTableItems = (state: RootState) => state.cuTable.items;
export const selectCuTableStatus = (state: RootState) => state.cuTable.status;
export const selectCuTableSortColumn = (state: RootState) => state.cuTable.sortColumn;
export const selectCuTableHeadersSort = (state: RootState) => state.cuTable.headersSort;

export default cuTableSlice.reducer;
