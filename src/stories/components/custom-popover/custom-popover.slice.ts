import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';

export interface PopoverState {
  id: string;
}

const initialState: PopoverState = {
  id: '',
};

export const popoverSlice = createSlice({
  name: 'popover',
  initialState,
  reducers: {
    openPopover: (state: PopoverState, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    closePopover: (state: PopoverState) => {
      state.id = '';
    },
  },
});

export const { openPopover, closePopover } = popoverSlice.actions;
export const getPopoverOpen = (state: RootState) => state?.popover.id || '';

export default popoverSlice.reducer;
