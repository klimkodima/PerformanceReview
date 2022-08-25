import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CurrentEditDataType,
  EditFormValuesType,
  TaskCoefficientsDataType,
  TaskTypeDataType,
  WebsiteGroupsType,
  WebsitesType
} from './types';

type initialStateType = {
  currentEditData: CurrentEditDataType;
  editFormValues: EditFormValuesType;
  taskCoefficientsData: TaskCoefficientsDataType[];
  taskTypesData: TaskTypeDataType[];
  websitesData: WebsitesType[];
};

const initialState: initialStateType = {
  currentEditData: {
    taskType: '',
    auditType: '',
    websiteCoefficient: null,
    groupCoefficient: 0,
    websiteGroup: ''
  },
  editFormValues: {
    websiteGroups: [],
    taskName: ''
  },
  taskCoefficientsData: [],
  taskTypesData: [],
  websitesData: []
};

const slice = createSlice({
  name: 'tasks coefficients table',
  initialState,
  reducers: {
    setCurrentEditData(state, action: PayloadAction<CurrentEditDataType>) {
      state.currentEditData = action.payload;
    },
    resetCurrentEditData(state) {
      state.currentEditData = {
        taskType: '',
        auditType: '',
        websiteCoefficient: null,
        groupCoefficient: 0,
        websiteGroup: '',
        websiteName: undefined
      };
    },
    setFormTaskName(state: initialStateType, action: PayloadAction<string>) {
      state.editFormValues.taskName = action.payload;
    },
    setFormWebsiteGroups(
      state: initialStateType,
      action: PayloadAction<{
        websiteGroups: WebsiteGroupsType | null;
        currentWebsiteGroup: string;
      }>
    ) {
      const websiteGroupIndex = state.editFormValues.websiteGroups.findIndex(
        ({ websiteGroup }) =>
          websiteGroup === action.payload.currentWebsiteGroup
      );

      if (websiteGroupIndex > -1 && action.payload.websiteGroups !== null) {
        state.editFormValues.websiteGroups[websiteGroupIndex] =
          action.payload.websiteGroups;
      } else if (action.payload.websiteGroups === null) {
        state.editFormValues.websiteGroups =
          state.editFormValues.websiteGroups.filter((site) => {
            return site.websiteGroup !== action.payload.currentWebsiteGroup;
          });
      } else {
        state.editFormValues.websiteGroups.push(action.payload.websiteGroups);
      }
    },
    setFormCurrentCoefficient(
      state: initialStateType,
      action: PayloadAction<number>
    ) {
      if (state.currentEditData.auditType === 'initial') {
        state.editFormValues.initialCoefficient = action.payload;
      }
      if (state.currentEditData.auditType === 'reaudit') {
        state.editFormValues.reauditCoefficient = action.payload;
      }
      return state;
    },
    resetEditFormValues(state: initialStateType) {
      state.editFormValues = {
        websiteGroups: [],
        taskName: ''
      };
    },
    setTaskCoefficientsData(
      state: initialStateType,
      { payload }: PayloadAction<TaskCoefficientsDataType[]>
    ) {
      state.taskCoefficientsData = payload;
    },
    setTaskTypesData(
      state: initialStateType,
      { payload }: PayloadAction<TaskTypeDataType[]>
    ) {
      state.taskTypesData = payload;
    },
    setWebsitesData(
      state: initialStateType,
      { payload }: PayloadAction<WebsitesType[]>
    ) {
      state.websitesData = payload;
    }
  }
});

// Actions
export const fetchTaskCoefficientsData = createAction(
  'tasks coefficients table/fetchTaskCoefficientsData'
);
export const updateTaskCoefficient = createAction(
  'tasks coefficients table/updateTaskCoefficient'
);

export const {
  setCurrentEditData,
  resetCurrentEditData,
  setFormCurrentCoefficient,
  setFormWebsiteGroups,
  setFormTaskName,
  resetEditFormValues,
  setTaskCoefficientsData,
  setTaskTypesData,
  setWebsitesData
} = slice.actions;

const tasksCoeffTableReducer = slice.reducer;
export default tasksCoeffTableReducer;
