import { RootStateType } from '../index';
import {
  CurrentEditDataType,
  EditFormValuesType,
  TaskCoefficientsDataType,
  TaskTypeDataType,
  WebsitesType
} from './types';

export const selectEditFormValues = (
  state: RootStateType
): EditFormValuesType => state.tasksCoefficient.editFormValues;

export const selectCurrentEditData = (
  state: RootStateType
): CurrentEditDataType => state.tasksCoefficient.currentEditData;

export const selectTaskTypesData = (state: RootStateType): TaskTypeDataType[] =>
  state.tasksCoefficient.taskTypesData;

export const selectTaskCoefficientsData = (
  state: RootStateType
): TaskCoefficientsDataType[] => state.tasksCoefficient.taskCoefficientsData;

export const selectWebsitesData = (state: RootStateType): WebsitesType[] =>
  state.tasksCoefficient.websitesData;
