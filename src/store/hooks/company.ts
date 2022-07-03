import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '.';
import { selectForm, createCompany } from '../features/form/formSlice';
import { CompanyState } from '../features/form/types';

interface Func {
  createCompany: (company: CompanyState) => void;
}

type UseReducerCompany = [CompanyState, Func];

export function useReducerCompany(): UseReducerCompany {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectForm);

  const dispatchCreateCompany: Func['createCompany'] = useCallback(
    (company) => {
      dispatch(createCompany(company));
    },
    [dispatch],
  );

  return [
    form.company,
    {
      createCompany: dispatchCreateCompany,
    },
  ];
}
