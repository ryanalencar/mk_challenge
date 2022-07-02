import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest }: InputProps,
  ref,
) => (
  <FormControl isInvalid={!!error}>
    {!!label && (
      <FormLabel htmlFor={name}>
        <Text size="xsm" color="blue.heading">
          {label}
        </Text>
      </FormLabel>
    )}
    <ChakraInput
      name={name}
      id={name}
      variant="filled"
      bg="white"
      borderColor="gray.200"
      _hover={{ background: 'white' }}
      _focus={{ borderColor: 'green' }}
      ref={ref}
      {...rest}
    />
    {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
  </FormControl>
);

export const Input = forwardRef(InputBase);
