import React from 'react';

import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Circle, HStack, Text } from '@chakra-ui/react';

export type UploadBoxOptions = {
  title: string;
  description: string;
  sent: boolean;
};

interface IUploadBoxProps {
  options: UploadBoxOptions;
}

export function UploadBox({ options }: IUploadBoxProps) {
  return (
    <HStack
      spacing={8}
      align="baseline"
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      fontWeight="bold"
      color="blue.heading"
      _hover={{
        bg: 'transparent',
        borderColor: 'blue.heading',
      }}
      px={8}
      py={6}>
      {options.sent && (
        <Circle size="20px" bg="green" borderColor="blue.heading" color="white">
          <CheckIcon boxSize={3} />
        </Circle>
      )}
      <Box>
        <Text size="xsm">{options.title}</Text>
        <Text size="xsm" variant="regular">
          {options.description}
        </Text>
      </Box>

      {options.sent ? (
        <Text size="xsm" color="green">
          Enviado
        </Text>
      ) : (
        <Button colorScheme="blue" size="sm">
          Enviar
        </Button>
      )}
    </HStack>
  );
}
