import { ReactNode } from 'react';

import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Circle,
  Icon,
  RadioProps,
  Text,
  useRadio,
  VStack,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IRadioCard extends RadioProps {
  children: ReactNode;
  icon: IconType;
}

export default function RadioCard({ icon, children, ...rest }: IRadioCard) {
  const { getInputProps, getCheckboxProps, state } = useRadio({ ...rest });
  const { isChecked } = state;
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        fontWeight="bold"
        color="blue.heading"
        _checked={{
          bg: 'transparent',
          borderColor: 'blue.heading',
        }}
        px={5}
        py={3}>
        <Circle
          pos="absolute"
          size="20px"
          bg={isChecked ? 'green' : 'white'}
          borderWidth={isChecked ? 0 : 1}
          borderColor="blue.heading"
          color="white">
          <CheckIcon boxSize={3} />
        </Circle>
        <VStack>
          {icon && <Icon boxSize="14" color="gray.300" as={icon} />}
          <Text size="xsm">{children}</Text>
        </VStack>
      </Box>
    </Box>
  );
}
