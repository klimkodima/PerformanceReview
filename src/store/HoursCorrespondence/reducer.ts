import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import hoursCorrespondence from './hoursCorrespondence.json';
import { HoursCorType, HoursCorInputType } from './types';

type initialStateType = {
  hoursCorrespondence: HoursCorType[];
};

const initialState: initialStateType = {
  hoursCorrespondence: hoursCorrespondence
};

const slice = createSlice({
  name: 'hours correspondence table',
  initialState,
  reducers: {
    setHoursCor(state, action: PayloadAction<HoursCorType[]>) {
      state.hoursCorrespondence = action.payload;
    },
    fetchHoursCor(state) {
      state.hoursCorrespondence;
    }
  }
});

export const postHoursCor = createAction<HoursCorInputType[]>('status_gaps');

export const { fetchHoursCor, setHoursCor } = slice.actions;

const hoursCorrespondenceReducer = slice.reducer;
export default hoursCorrespondenceReducer;
