import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuditActivitiesType, TeamActivitiesPercentageType } from './types';

type initialStateType = {
  auditActivities: AuditActivitiesType;
  teamActivities: TeamActivitiesPercentageType[];
};

const initialState: initialStateType = {
  auditActivities: { totalTimeSpend: 0, labels: [] },
  teamActivities: []
};

const slice = createSlice({
  name: 'activitiesPercentage',
  initialState,
  reducers: {
    setAuditActivities(state, action: PayloadAction<AuditActivitiesType>) {
      state.auditActivities = action.payload;
    },
    setTeamActivities(
      state,
      action: PayloadAction<TeamActivitiesPercentageType[]>
    ) {
      state.teamActivities = action.payload;
    }
  }
});

// Actions

export const fetchTeamActivities = createAction(
  'activitiesPercentage/fetchTeamActivities'
);
export const fetchAuditActivities = createAction(
  'activitiesPercentage/fetchAuditActivities'
);

export const { setAuditActivities, setTeamActivities } = slice.actions;

const activitiesPercentageReducer = slice.reducer;
export default activitiesPercentageReducer;
