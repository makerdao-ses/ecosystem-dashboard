import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';

export interface CuTableState {
  items: [],
  status: string,
}

const initialState: CuTableState = {
  items: [],
  status: 'idle',
};

const fetchItems = async() => {
  return ['one', 'two', 'three', 'four', 'five'];
};

export const loadAsync = createAsyncThunk(
  'cuTable/loadItems',
  async() => {
    const response = await fetchItems();

    return response;
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
