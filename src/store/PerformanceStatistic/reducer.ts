import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

import { PerfStatType } from './types';

type initialStateType = {
  PerformanceStatistic: PerfStatType[];
};

const initialState: initialStateType = {
  PerformanceStatistic: []
};

const slice = createSlice({
  name: 'PerformanceStatisticWidget',
  initialState,
  reducers: {
    setPerformanceStatistic(state, action: PayloadAction<PerfStatType[]>) {
      state.PerformanceStatistic = action.payload;
    }
  }
});

export const fetchPerformanceStatistic = createAction(
  'PerformanceStatisticWidget/fetchPerformanceStatistic'
);

export const { setPerformanceStatistic } = slice.actions;

const performanceStatisticReducer = slice.reducer;
export default performanceStatisticReducer;
