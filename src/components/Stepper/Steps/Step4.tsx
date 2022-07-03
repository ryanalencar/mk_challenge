import React from 'react';

import { WarningIcon } from '@chakra-ui/icons';
import { HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';

export default function Step4() {
  return (
    <VStack spacing={5} textAlign={['center']}>
      <Image src="/images/account_success.png" alt="Conta criada com sucesso" />
      <Text color="green" size="sm">
        Sua conta foi cadastrada com sucesso!
      </Text>
      <Stack align="center" spacing={0}>
        <Text color="blue.heading" size="xsm">
          Aguarde que nossa equipe está validando os dados informados.
        </Text>
        <Text color="blue.heading" size="xsm" variant="regular">
          Eviaremos a confirmação o mais breve possível em seu email.
        </Text>
      </Stack>
      <HStack color="orange.300">
        <WarningIcon fontSize="larger" />
        <Text size={['xsm', 'sm']}>
          Foi enviado um email com os próximos passos
        </Text>
      </HStack>
    </VStack>
  );
}
