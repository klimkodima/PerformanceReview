import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PickedDateType } from './types';

export type initialStateType = {
  pickedDate: PickedDateType;
};

const initialState: initialStateType = {
  pickedDate: {
    startDate: '',
    finishDate: ''
  }
};

const slice = createSlice({
  name: 'DateFilterReducer',
  initialState,
  reducers: {
    setDateFilter(
      state: initialStateType,
      action: PayloadAction<PickedDateType>
    ) {
      state.pickedDate = action.payload;
    }
  }
});

// Actions
export const { setDateFilter } = slice.actions;

const dateFilterReducer = slice.reducer;
export default dateFilterReducer;
