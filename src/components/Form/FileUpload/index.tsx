import React, { ReactNode, useRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Text,
} from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IFileUploadProps {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  error?: FieldError;
  children?: ReactNode;
  onChange?: () => void;
}

export function FileUpload({
  register,
  multiple,
  children,
  accept,
  error,
  onChange,
}: IFileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <FormControl isInvalid={!!error} isRequired>
      <InputGroup onClick={handleClick} onChange={onChange}>
        <input
          type="file"
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        {children}
      </InputGroup>
      {!!error && (
        <FormErrorMessage>
          <Text variant="bold" size="xsm">
            {error?.message}
          </Text>
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
