import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import mockCriteria from './mockCriteria.json';

import { CriteriaDataType } from './types';

type initialStateType = {
  criteria: CriteriaDataType;
};

const initialState: initialStateType = {
  criteria: mockCriteria
};

const slice = createSlice({
  name: 'criteriaWidget',
  initialState,
  reducers: {
    setCriteria(state, action: PayloadAction<CriteriaDataType>) {
      state.criteria = action.payload;
    }
  }
});

// Actions
export const fetchCriteria = createAction('criteriaWidget/fetchCriteria');

export const { setCriteria } = slice.actions;

const criteriaReducer = slice.reducer;
export default criteriaReducer;
