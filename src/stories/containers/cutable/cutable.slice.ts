import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';
import { CoreUnitDAO, fetchCoreUnits, fetchFacilitatorImage } from './cutable.api';

export interface CuTableState {
  items: CoreUnitDAO[],
  facilitatorImages: {[id:string]: string}
  status: string,
}

const initialState: CuTableState = {
  items: [],
  status: 'idle',
  facilitatorImages: {}
};

export const loadAsync = createAsyncThunk(
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
    builder.addCase(loadAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(loadAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload as [];
    }).addCase(loadFacilitatorImage.fulfilled, (state, action) => {
      state.facilitatorImages[action.payload.id] = action.payload?.facilitatorImage?.trim() ?? '';
    });
  }
});

export const { clearTable, setFacilitatorImageAsPending } = cuTableSlice.actions;

export const selectCuTableItems = (state: RootState) => state.cuTable.items;
export const selectFacilitatorImages = (state: RootState) => state.cuTable.facilitatorImages;

export default cuTableSlice.reducer;
