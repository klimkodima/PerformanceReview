import { RootStateType } from '../index';
import { TeamType } from './types';

export const selectTeams = (state: RootStateType): TeamType[] =>
  state.teams.teams;
