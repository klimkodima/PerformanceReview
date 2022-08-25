import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContentAuditorType } from './types';

type initialStateType = {
  auditorData: ContentAuditorType;
};

const initialState: initialStateType = {
  auditorData: {
    fullName: '',
    level: '',
    experienceInMonths: 0,
    teamName: '',
    teamLeadName: '',
    photo: ''
  }
};

const slice = createSlice({
  name: 'contentAuditor',
  initialState,
  reducers: {
    setContentAuditor(state, action: PayloadAction<ContentAuditorType>) {
      state.auditorData = action.payload;
    },
    fetchContentAuditor(state) {
      state.auditorData;
    }
  }
});

export const { setContentAuditor, fetchContentAuditor } = slice.actions;

const contentAuditorReducer = slice.reducer;
export default contentAuditorReducer;
