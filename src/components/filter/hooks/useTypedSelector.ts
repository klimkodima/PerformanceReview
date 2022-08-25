import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStateType } from 'src/store';

export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;
