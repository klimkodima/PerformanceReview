import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamType, TeamInputType, TeamInfoType } from './types';

type initialStateType = {
  teams: TeamType[];
};

const initialState: initialStateType = {
  teams: []
};

const slice = createSlice({
  name: 'teams table',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<TeamType[]>) {
      state.teams = action.payload;
    },
    fetchTeams(state) {
      state.teams;
    }
  }
});

export const fetchTeamsData = createAction('Teams/fetchTeams');
export const createNewTeamRow = createAction<TeamInputType>(
  'Teams/createNewTeamRow'
);
export const deleteTeamRow = createAction<string>('Teams/deleteTeamRow');
export const updateTeamRow = createAction<TeamInfoType>('Teams/updateTeamRow');

export const { fetchTeams, setTeams } = slice.actions;

const teamsReducer = slice.reducer;
export default teamsReducer;
