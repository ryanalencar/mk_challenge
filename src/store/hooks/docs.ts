import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '.';
import { selectForm, uploadDocs } from '../features/form/formSlice';
import { DocsState } from '../features/form/types';

interface Func {
  uploadDocs: (docs: DocsState) => void;
}

type UseReducerCompany = [DocsState, Func];

export function useReducerCompany(): UseReducerCompany {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectForm);

  const dispatchUploadDocs: Func['uploadDocs'] = useCallback(
    (docs) => {
      dispatch(uploadDocs(docs));
    },
    [dispatch],
  );

  return [
    form.docs,
    {
      uploadDocs: dispatchUploadDocs,
    },
  ];
}
