import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../..';
import { CompanyState, FormState, UserState } from './types';

const initialState: FormState = {
  company: {
    address: '',
    addressNumber: '',
    cnpj: '',
    companySegment: '',
    companyType: '',
    complement: '',
    corporateName: '',
    district: '',
    phone: '',
    zipCode: '',
  },
  user: {
    email: '',
    name: '',
    phone: '',
    useContractRead: false,
    phoneVerified: false,
  },
};

const counterSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload.email) state.user.email = action.payload.email;
      if (action.payload.name) state.user.name = action.payload.name;
      if (action.payload.phone) state.user.phone = action.payload.phone;
      if (action.payload.phoneVerified) {
        state.user.phoneVerified = action.payload.phoneVerified;
      }
      if (action.payload.useContractRead) {
        state.user.useContractRead = action.payload.useContractRead;
      }
    },
    createCompany: (state, action: PayloadAction<CompanyState>) => {
      state.company = action.payload;
    },
  },
});
export const { createUser, updateUser, createCompany } = counterSlice.actions;

export const selectForm = (state: RootState) => state.formReducer;

export default counterSlice.reducer;
