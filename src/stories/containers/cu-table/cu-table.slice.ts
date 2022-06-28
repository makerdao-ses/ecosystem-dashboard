import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';
import { fetchCoreUnits, fetchFacilitatorImage } from './cu-table.api';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

export interface CuTableState {
  items: CoreUnitDto[],
  facilitatorImages: {[id:string]: string}
  status: string,
}

const initialState: CuTableState = {
  items: [],
  status: 'loading',
  facilitatorImages: {}
};

export const loadCuTableItemsAsync = createAsyncThunk(
  'cuTable/loadItems',
  async() => {
    return await fetchCoreUnits();
  }
);

export const loadFacilitatorImage = createAsyncThunk(
  'cuTable/loadFacilitatorImage',
  async(id: string) => {
    return await fetchFacilitatorImage(id);
  }
);

export const cuTableSlice = createSlice({
  name: 'cuTable',
  initialState,
  reducers: {
    clearTable: (state) => {
      state.items = [];
    },
    setFacilitatorImageAsPending: (state, action: PayloadAction<string>) => {
      state.facilitatorImages[action.payload] = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCuTableItemsAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(loadCuTableItemsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload as [];
    }).addCase(loadFacilitatorImage.fulfilled, (state, action) => {
      state.facilitatorImages[action.payload.id] = action.payload?.facilitatorImage?.trim() ?? '';
    }).addCase(loadCuTableItemsAsync.rejected, (state) => {
      state.status = 'idle';
    });
  }
});

export const { clearTable, setFacilitatorImageAsPending } = cuTableSlice.actions;

export const selectCuTableItems = (state: RootState) => state.cuTable.items;
export const selectFacilitatorImages = (state: RootState) => state.cuTable.facilitatorImages;
export const selectCuTableStatus = (state: RootState) => state.cuTable.status;

export default cuTableSlice.reducer;
