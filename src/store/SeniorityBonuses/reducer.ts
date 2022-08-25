import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BonusesDataType, SeniorityBonusType } from './types';

type initialStateType = {
  bonusesData: BonusesDataType[];
};

const initialState: initialStateType = {
  bonusesData: []
};

const slice = createSlice({
  name: 'SeniorityBonuses',
  initialState,
  reducers: {
    setBonusesData(
      state: initialStateType,
      action: PayloadAction<BonusesDataType[]>
    ) {
      state.bonusesData = action.payload;
    }
  }
});

export const fetchBonusesData = createAction(
  'SeniorityBonuses/fetchBonusesData'
);
export const createNewBonusesRow = createAction<BonusesDataType>(
  'SeniorityBonuses/createNewBonusesRow'
);
export const deleteBonusesRow = createAction<string>(
  'SeniorityBonuses/deleteBonusesRow'
);
export const updateBonusesRow = createAction<SeniorityBonusType>(
  'SeniorityBonuses/updateBonusesRow'
);

export const { setBonusesData } = slice.actions;

const seniorityBonusesReducer = slice.reducer;
export default seniorityBonusesReducer;
