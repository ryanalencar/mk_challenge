import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import formReducer from './features/form/formSlice';
import { FormState } from './features/form/types';

export const store = configureStore({
  reducer: {
    formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = { formReducer: FormState };
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
