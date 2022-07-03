import React from 'react';

import {
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import ReactInputMask from 'react-input-mask';

import { Input } from '../../Form';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

export function Step1() {
  const toast = useToast();

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
          isReadOnly
          type="tel"
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
        <HStack>
          <PinInput placeholder="0">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Flex>
          <Button
            variant="link"
            fontWeight="regular"
            textDecoration="underline"
            color="blue.heading"
            size="xsm"
            onClick={() => {
              if (toast.isActive('sms-sent-toast')) return null;
              toast({
                id: 'sms-sent-toast',
                title: 'Código SMS enviado.',
                description:
                  'Aguardo alguns minutos até que o código seja recebido.',
                status: 'info',
                duration: 3000,
                isClosable: true,
              });
            }}>
            Não recebeu o código? Clique para reenviar
          </Button>
        </Flex>
      </Stack>
      <TabPanelFooter footerButtonText="Confirmar" />
    </Stack>
  );
}
