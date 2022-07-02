import React from 'react';

import { Flex, Stack, Text } from '@chakra-ui/react';
import ReactInputMask from 'react-input-mask';

import { Input } from '../../Form';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

export function Step1() {
  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Text size="sm" color="green">
          Validação enviada para seu celular
        </Text>
        <Text size="xsm" variant="regular">
          Enviamos uma mensagem SMS com o código de confirmação
          <br /> para o celular abaixo:
        </Text>
        <Input
          as={ReactInputMask}
          mask="(99) 99999-9999"
          label="Celular"
          textAlign="center"
          color="blue.heading"
          fontWeight="700"
          borderRadius={50}
          w={['25%']}
        />
      </Stack>
      <Stack>
        <Text size="sm" color="blue.heading">
          Informe o código de verificação
        </Text>
        <Flex>
          <Text
            variant="regular"
            textDecoration="underline"
            color="blue.heading"
            size="xsm">
            Não recebeu o código? Clique para reenviar
          </Text>
        </Flex>
      </Stack>
      <TabPanelFooter footerButtonText="Confirmar" />
    </Stack>
  );
}
