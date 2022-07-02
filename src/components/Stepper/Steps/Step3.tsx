import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

// type Step3Data = {};

export function Step3() {
  return (
    <Stack spacing={10}>
      <Stack spacing={5}>
        <Text size="xsm" variant="regular">
          Para concluir o processo de cadastro, você deve enviar os documentos
          da empresa
          <br /> e de identificação sua como responsável pela empresa
        </Text>
        <Text size="xsm" color="blue.heading">
          Envie os documentos abaixo:
        </Text>
      </Stack>
    </Stack>
  );
}
