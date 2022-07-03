import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '.';
import { selectForm, createUser, updateUser } from '../features/form/formSlice';
import { UserState } from '../features/form/types';

interface Func {
  createUser: (user: UserState) => void;
  updateUser: (user: Partial<UserState>) => void;
}

type UseReducerUser = [UserState, Func];

export function useReducerUser(): UseReducerUser {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectForm);

  const dispatchCreateUser: Func['createUser'] = useCallback(
    (user) => {
      dispatch(createUser(user));
    },
    [dispatch],
  );

  const dispatchUpdateUser: Func['updateUser'] = useCallback(
    (userData) => {
      dispatch(updateUser(userData));
    },
    [dispatch],
  );

  return [
    form.user,
    {
      createUser: dispatchCreateUser,
      updateUser: dispatchUpdateUser,
    },
  ];
}
