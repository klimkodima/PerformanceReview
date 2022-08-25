import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  FilterState,
  FilterAction,
  AuditorType,
  TeamsDataResponseType
} from './types';

export const initialState: FilterState = {
  data: [],
  teams: [],
  filteredTeams: [],
  filteredLevels: [],
  filteredAuditors: [],
  checkedTeams: [],
  checkedLevels: [],
  checkedAuditors: [],
  searchedAuditors: [],
  isDisabledReset: true,
  checkedAuditorsData: [],
  isShowFilter: false
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterByTeam: (state, action: FilterAction) => {
      state.checkedTeams = state.checkedTeams.includes(action.payload)
        ? state.checkedTeams.filter((item) => item !== action.payload)
        : state.checkedTeams.concat(action.payload);

      if (state.checkedLevels.length) {
        if (state.checkedTeams.length) {
          state.filteredAuditors = state.data.flatMap((item: AuditorType) =>
            state.checkedLevels.includes(item.level) &&
            state.checkedTeams.includes(item.team)
              ? item.name
              : []
          );
        } else {
          state.filteredAuditors = state.data.flatMap((item: AuditorType) =>
            state.checkedLevels.includes(item.level) ? item.name : []
          );
        }
      } else {
        state.filteredAuditors = state.data.flatMap((item: AuditorType) =>
          state.checkedTeams.includes(item.team) ? item.name : []
        );
      }

      if (state.checkedAuditors.length) {
        if (state.checkedTeams.length) {
          state.filteredLevels = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedAuditors.includes(item.name) &&
                state.checkedTeams.includes(item.team)
                  ? item.level
                  : []
              )
            )
          );
        } else {
          state.filteredLevels = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedAuditors.includes(item.name) ? item.level : []
              )
            )
          );
        }
      } else {
        state.filteredLevels = Array.from(
          new Set(
            state.data.flatMap((item: AuditorType) =>
              state.checkedTeams.includes(item.team) ? item.level : []
            )
          )
        );
      }
    },

    filterByLevel: (state, action: FilterAction) => {
      state.checkedLevels = state.checkedLevels.includes(action.payload)
        ? state.checkedLevels.filter((item) => item !== action.payload)
        : state.checkedLevels.concat(action.payload);

      if (state.checkedAuditors.length) {
        if (state.checkedLevels.length) {
          state.filteredTeams = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedAuditors.includes(item.name) &&
                state.checkedLevels.includes(item.level)
                  ? item.team
                  : []
              )
            )
          );
        } else {
          state.filteredTeams = state.data.flatMap((item: AuditorType) =>
            state.checkedAuditors.includes(item.name) ? item.team : []
          );
        }
      } else {
        state.filteredTeams = Array.from(
          new Set(
            state.data.flatMap((item: AuditorType) =>
              state.checkedLevels.includes(item.level) ? item.team : []
            )
          )
        );
      }

      if (state.checkedTeams.length) {
        if (state.checkedLevels.length) {
          state.filteredAuditors = state.data.flatMap((item: AuditorType) =>
            state.checkedTeams.includes(item.team) &&
            state.checkedLevels.includes(item.level)
              ? item.name
              : []
          );
        } else {
          state.filteredAuditors = state.data.flatMap((item: AuditorType) =>
            state.checkedTeams.includes(item.team) ? item.name : []
          );
        }
      } else {
        state.filteredAuditors = state.data.flatMap((item: AuditorType) =>
          state.checkedLevels.includes(item.level) ? item.name : []
        );
      }
    },

    filterByAuditor: (state, action: FilterAction) => {
      state.checkedAuditors = state.checkedAuditors.includes(action.payload)
        ? state.checkedAuditors.filter((item) => item !== action.payload)
        : state.checkedAuditors.concat(action.payload);

      if (state.checkedLevels.length) {
        if (state.checkedAuditors.length) {
          state.filteredTeams = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedLevels.includes(item.level) &&
                state.checkedAuditors.includes(item.name)
                  ? item.team
                  : []
              )
            )
          );
        } else {
          state.filteredTeams = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedLevels.includes(item.level) ? item.team : []
              )
            )
          );
        }
      } else {
        state.filteredTeams = Array.from(
          new Set(
            state.data.flatMap((item: AuditorType) =>
              state.checkedAuditors.includes(item.name) ? item.team : []
            )
          )
        );
      }

      if (state.checkedTeams.length) {
        if (state.checkedAuditors.length) {
          state.filteredLevels = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedTeams.includes(item.team) &&
                state.checkedAuditors.includes(item.name)
                  ? item.level
                  : []
              )
            )
          );
        } else {
          state.filteredLevels = Array.from(
            new Set(
              state.data.flatMap((item: AuditorType) =>
                state.checkedTeams.includes(item.team) ? item.level : []
              )
            )
          );
        }
      } else {
        state.filteredLevels = Array.from(
          new Set(
            state.data.flatMap((item: AuditorType) =>
              state.checkedAuditors.includes(item.name) ? item.level : []
            )
          )
        );
      }

      const checkedAuditorsList = state.data.filter(({ name }) =>
        state.checkedAuditors.includes(name)
      );

      state.checkedAuditorsData = checkedAuditorsList.reduce(
        (acc, auditor) => ({
          ...acc,
          [auditor.id]: auditor
        }),
        {}
      );
    },

    searchForAuditors: (state, action: FilterAction) => {
      state.searchedAuditors = state.data
        .map((item: AuditorType) => item.name)
        .filter((item) =>
          item.toUpperCase().includes(action.payload.toUpperCase())
        );
    },

    checkResetEnabled: (state) => {
      state.isDisabledReset = !(
        state.checkedAuditors.length ||
        state.checkedTeams.length ||
        state.checkedLevels.length
      );
    },

    reset: (state) => {
      state.filteredTeams = [];
      state.filteredLevels = [];
      state.filteredAuditors = [];
      state.checkedTeams = [];
      state.checkedLevels = [];
      state.checkedAuditors = [];
      state.searchedAuditors = [];
      state.checkedAuditorsData = [];
      state.isDisabledReset = true;
    },
    resetFilterUsersData: (state) => {
      state.data = [];
    },
    setFiltersData: (
      state: FilterState,
      action: PayloadAction<AuditorType[]>
    ) => {
      state.data = action.payload;
    },
    setIsShowFilter: (state: FilterState, action: PayloadAction<boolean>) => {
      state.isShowFilter = action.payload;
    },
    setFilteredAuditorsData: (state: FilterState) => {
      const checkedAuditorsList = state.data.filter(({ name }) => {
        if (
          state.filteredAuditors.length &&
          state.filteredAuditors.includes(name) &&
          state.checkedAuditors.includes(name)
        ) {
          return true;
        } else
          return (
            state.checkedAuditors.includes(name) &&
            !state.filteredAuditors.length
          );
      });

      state.checkedAuditorsData = checkedAuditorsList.reduce(
        (acc, auditor) => ({
          ...acc,
          [auditor.id]: auditor
        }),
        {}
      );
    },
    setTeams: (
      state: FilterState,
      action: PayloadAction<TeamsDataResponseType[]>
    ) => {
      state.teams = action.payload;
    }
  }
});

export const fetchFilterData = createAction('filter/fetchFilterData');

export const {
  filterByTeam,
  filterByLevel,
  filterByAuditor,
  searchForAuditors,
  reset,
  checkResetEnabled,
  setFiltersData,
  setIsShowFilter,
  setFilteredAuditorsData,
  resetFilterUsersData,
  setTeams
} = filterSlice.actions;

const filterReducer = filterSlice.reducer;
export default filterReducer;
