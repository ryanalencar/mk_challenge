import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  options: string[];
  placeholder: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, InputProps> = (
  { name, label, error, options, placeholder, ...rest }: InputProps,
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
    <ChakraSelect
      placeholder={placeholder}
      name={name}
      id={name}
      variant="filled"
      bg="white"
      iconColor="green"
      borderColor="gray.200"
      _hover={{ background: 'white' }}
      _focus={{ borderColor: error ? 'red.500' : 'green' }}
      ref={ref}
      {...rest}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </ChakraSelect>
    {!!error && (
      <FormErrorMessage>
        <Text variant="bold" size="xsm">
          {error?.message}
        </Text>
      </FormErrorMessage>
    )}
  </FormControl>
);

export const Select = forwardRef(SelectBase);
